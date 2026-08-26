'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export interface StyleTransferModels {
  styleNet: tf.GraphModel | null;
  transformNet: tf.GraphModel | null;
}

export type StyleModelType = 'mobilenet' | 'inception';
export type TransformerModelType = 'separable' | 'original';

export interface UseStyleTransferReturn {
  models: StyleTransferModels;
  isLoading: boolean;
  error: string | null;
  loadModels: (styleType: StyleModelType, transformerType: TransformerModelType) => Promise<void>;
  stylizeImage: (
    contentImg: HTMLImageElement,
    styleImg: HTMLImageElement,
    styleRatio: number,
    contentDim?: number,
    styleDim?: number
  ) => Promise<ImageData>;
  combineStyles: (
    contentImg: HTMLImageElement,
    styleImg1: HTMLImageElement,
    styleImg2: HTMLImageElement,
    combinationRatio: number,
    contentDim?: number,
    styleDim?: number
  ) => Promise<ImageData>;
  progress: string;
}

function resizeImageToCanvas(img: HTMLImageElement, maxDim: number): HTMLCanvasElement {
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function useStyleTransfer(): UseStyleTransferReturn {
  const [models, setModels] = useState<StyleTransferModels>({
    styleNet: null,
    transformNet: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  // Cache for loaded models
  const modelCache = useRef<{
    mobileStyleNet?: tf.GraphModel;
    inceptionStyleNet?: tf.GraphModel;
    originalTransformNet?: tf.GraphModel;
    separableTransformNet?: tf.GraphModel;
  }>({});

  useEffect(() => {
    // Set TensorFlow.js backend settings
    tf.ENV.set('WEBGL_PACK', false);
    
    // Load default models on mount
    loadModels('mobilenet', 'separable');
    
    return () => {
      // Cleanup - dispose models when component unmounts
      Object.values(modelCache.current).forEach(model => {
        if (model) model.dispose();
      });
    };
  }, []);

  const loadMobileNetStyleModel = async (): Promise<tf.GraphModel> => {
    if (modelCache.current.mobileStyleNet) {
      return modelCache.current.mobileStyleNet;
    }
    
    const model = await tf.loadGraphModel('/saved_model_style_js/model.json');
    modelCache.current.mobileStyleNet = model;
    return model;
  };

  const loadInceptionStyleModel = async (): Promise<tf.GraphModel> => {
    if (modelCache.current.inceptionStyleNet) {
      return modelCache.current.inceptionStyleNet;
    }
    
    const model = await tf.loadGraphModel('/saved_model_style_inception_js/model.json');
    modelCache.current.inceptionStyleNet = model;
    return model;
  };

  const loadOriginalTransformerModel = async (): Promise<tf.GraphModel> => {
    if (modelCache.current.originalTransformNet) {
      return modelCache.current.originalTransformNet;
    }
    
    const model = await tf.loadGraphModel('/saved_model_transformer_js/model.json');
    modelCache.current.originalTransformNet = model;
    return model;
  };

  const loadSeparableTransformerModel = async (): Promise<tf.GraphModel> => {
    if (modelCache.current.separableTransformNet) {
      return modelCache.current.separableTransformNet;
    }
    
    const model = await tf.loadGraphModel('/saved_model_transformer_separable_js/model.json');
    modelCache.current.separableTransformNet = model;
    return model;
  };

  const loadModels = useCallback(async (
    styleType: StyleModelType,
    transformerType: TransformerModelType
  ) => {
    setIsLoading(true);
    setError(null);
    setProgress('Loading models...');

    try {
      let styleNet: tf.GraphModel;
      let transformNet: tf.GraphModel;

      if (styleType === 'mobilenet') {
        setProgress('Loading MobileNet style model...');
        styleNet = await loadMobileNetStyleModel();
      } else {
        setProgress('Loading Inception style model...');
        styleNet = await loadInceptionStyleModel();
      }

      if (transformerType === 'separable') {
        setProgress('Loading separable transformer model...');
        transformNet = await loadSeparableTransformerModel();
      } else {
        setProgress('Loading original transformer model...');
        transformNet = await loadOriginalTransformerModel();
      }

      setModels({ styleNet, transformNet });
      setProgress('Models loaded successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load models';
      setError(errorMessage);
      setProgress('');
      console.error('Error loading models:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stylizeImage = useCallback(async (
    contentImg: HTMLImageElement,
    styleImg: HTMLImageElement,
    styleRatio: number = 1.0,
    contentDim: number = 256,
    styleDim: number = 256
  ): Promise<ImageData> => {
    if (!models.styleNet || !models.transformNet) {
      throw new Error('Models not loaded');
    }

    const contentCanvas = resizeImageToCanvas(contentImg, contentDim);
    const styleCanvas = resizeImageToCanvas(styleImg, styleDim);

    try {
      setProgress('Generating style representation...');
      await tf.nextFrame();

      // Generate style bottleneck
      let bottleneck = tf.tidy(() => {
        return models.styleNet!.predict(
          tf.browser.fromPixels(styleCanvas)
            .toFloat()
            .div(tf.scalar(255))
            .expandDims()
        ) as tf.Tensor;
      });

      // If styleRatio is not 1.0, blend with content's style
      if (styleRatio !== 1.0) {
        setProgress('Blending styles...');
        await tf.nextFrame();
        
        const identityBottleneck = tf.tidy(() => {
          return models.styleNet!.predict(
            tf.browser.fromPixels(contentCanvas)
              .toFloat()
              .div(tf.scalar(255))
              .expandDims()
          ) as tf.Tensor;
        });

        const styleBottleneck = bottleneck;
        bottleneck = tf.tidy(() => {
          const styleBottleneckScaled = styleBottleneck.mul(tf.scalar(styleRatio));
          const identityBottleneckScaled = identityBottleneck.mul(tf.scalar(1.0 - styleRatio));
          return styleBottleneckScaled.add(identityBottleneckScaled);
        });

        styleBottleneck.dispose();
        identityBottleneck.dispose();
      }

      setProgress('Stylizing image...');
      await tf.nextFrame();

      // Transform the content image with the style
      const stylized = tf.tidy(() => {
        const contentTensor = tf.browser.fromPixels(contentCanvas)
          .toFloat()
          .div(tf.scalar(255))
          .expandDims();
        
        // The transformer expects an array of [contentImage, styleBottleneck]
        const result = models.transformNet!.predict([contentTensor, bottleneck]) as tf.Tensor;
        
        // Clamp values between 0 and 1
        return tf.clipByValue(result.squeeze(), 0, 1) as tf.Tensor3D;
      });

      // Convert to ImageData
      const imageData = await tf.browser.toPixels(stylized);
      const width = stylized.shape[1];
      const height = stylized.shape[0];
      
      // Cleanup
      bottleneck.dispose();
      stylized.dispose();

      setProgress('');
      return new ImageData(
        new Uint8ClampedArray(imageData),
        width,
        height
      );
    } catch (err) {
      setProgress('');
      console.error('Stylization error:', err);
      throw new Error(`Stylization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [models]);

  const combineStyles = useCallback(async (
    contentImg: HTMLImageElement,
    styleImg1: HTMLImageElement,
    styleImg2: HTMLImageElement,
    combinationRatio: number = 0.5,
    contentDim: number = 256,
    styleDim: number = 256
  ): Promise<ImageData> => {
    if (!models.styleNet || !models.transformNet) {
      throw new Error('Models not loaded');
    }

    const contentCanvas = resizeImageToCanvas(contentImg, contentDim);
    const styleCanvas1 = resizeImageToCanvas(styleImg1, styleDim);
    const styleCanvas2 = resizeImageToCanvas(styleImg2, styleDim);

    try {
      setProgress('Generating style representation for style A...');
      await tf.nextFrame();

      const bottleneck1 = tf.tidy(() => {
        return models.styleNet!.predict(
          tf.browser.fromPixels(styleCanvas1)
            .toFloat()
            .div(tf.scalar(255))
            .expandDims()
        ) as tf.Tensor;
      });

      setProgress('Generating style representation for style B...');
      await tf.nextFrame();

      const bottleneck2 = tf.tidy(() => {
        return models.styleNet!.predict(
          tf.browser.fromPixels(styleCanvas2)
            .toFloat()
            .div(tf.scalar(255))
            .expandDims()
        ) as tf.Tensor;
      });

      setProgress('Combining styles...');
      await tf.nextFrame();

      const combinedBottleneck = tf.tidy(() => {
        const scaledBottleneck1 = bottleneck1.mul(tf.scalar(1 - combinationRatio));
        const scaledBottleneck2 = bottleneck2.mul(tf.scalar(combinationRatio));
        return scaledBottleneck1.add(scaledBottleneck2);
      });

      setProgress('Stylizing image...');
      await tf.nextFrame();

      const stylized = tf.tidy(() => {
        const contentTensor = tf.browser.fromPixels(contentCanvas)
          .toFloat()
          .div(tf.scalar(255))
          .expandDims();
        
        const result = models.transformNet!.predict([contentTensor, combinedBottleneck]) as tf.Tensor;
        
        // Clamp values between 0 and 1
        return tf.clipByValue(result.squeeze(), 0, 1) as tf.Tensor3D;
      });

      const imageData = await tf.browser.toPixels(stylized);
      const width = stylized.shape[1];
      const height = stylized.shape[0];

      // Cleanup
      bottleneck1.dispose();
      bottleneck2.dispose();
      combinedBottleneck.dispose();
      stylized.dispose();

      setProgress('');
      return new ImageData(
        new Uint8ClampedArray(imageData),
        width,
        height
      );
    } catch (err) {
      setProgress('');
      console.error('Style combination error:', err);
      throw new Error(`Style combination failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [models]);

  return {
    models,
    isLoading,
    error,
    loadModels,
    stylizeImage,
    combineStyles,
    progress,
  };
}