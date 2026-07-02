'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Loader2 } from 'lucide-react';
import { ImageControls, useImageElement } from './ImageControls';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StyleTransferProps {
  onStylize: (
    contentImg: HTMLImageElement,
    styleImg: HTMLImageElement,
    styleRatio: number
  ) => Promise<ImageData>;
  isProcessing: boolean;
  progress: string;
}

const CONTENT_IMAGES = [
  { value: 'chicago', label: 'Chicago' },
  { value: 'golden_gate', label: 'Golden Gate' },
  { value: 'stata', label: 'Stata' },
  { value: 'diana', label: 'Diana' },
  { value: 'beach', label: 'Beach' },
  { value: 'statue_of_liberty', label: 'Statue of Liberty' },
];

const STYLE_IMAGES = [
  { value: 'seaport', label: 'Seaport' },
  { value: 'udnie', label: 'Udnie' },
  { value: 'stripes', label: 'Stripes' },
  { value: 'bricks', label: 'Bricks' },
  { value: 'clouds', label: 'Clouds' },
  { value: 'towers', label: 'Towers' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'red_circles', label: 'Red Circles' },
  { value: 'zigzag', label: 'Zigzag' },
];

export function StyleTransfer({ onStylize, isProcessing, progress }: StyleTransferProps) {
  const [contentSrc, setContentSrc] = useState('/images/chicago.jpg');
  const [styleSrc, setStyleSrc] = useState('/images/seaport.jpg');
  const [contentSize, setContentSize] = useState(256);
  const [styleSize, setStyleSize] = useState(256);
  const [styleRatio, setStyleRatio] = useState(100);
  const [outputImage, setOutputImage] = useState<ImageData | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentImgElement = useImageElement(contentSrc);
  const styleImgElement = useImageElement(styleSrc);

  useEffect(() => {
    if (outputImage && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = outputImage.width;
        canvasRef.current.height = outputImage.height;
        ctx.putImageData(outputImage, 0, 0);
      }
    }
  }, [outputImage]);

  const handleStylize = async () => {
    if (!contentImgElement || !styleImgElement) {
      alert('Please wait for images to load');
      return;
    }

    try {
      const result = await onStylize(
        contentImgElement,
        styleImgElement,
        styleRatio / 100
      );
      setOutputImage(result);
    } catch (error) {
      console.error('Stylization error:', error);
      alert('Error during stylization. Please try again.');
    }
  };

  const handleRandomize = () => {
    setContentSize(Math.floor(Math.random() * (400 - 256 + 1)) + 256);
    setStyleSize(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    setStyleRatio(Math.floor(Math.random() * 101));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageControls
          label="Content"
          imageSrc={contentSrc}
          onImageChange={setContentSrc}
          imageSize={contentSize}
          onSizeChange={setContentSize}
          minSize={256}
          maxSize={400}
          tooltip="A bigger content image results in a more detailed output, but increases processing time significantly."
          presetImages={CONTENT_IMAGES}
        />

        <ImageControls
          label="Style"
          imageSrc={styleSrc}
          onImageChange={setStyleSrc}
          imageSize={styleSize}
          onSizeChange={setStyleSize}
          minSize={100}
          maxSize={400}
          tooltip="Changing the size of a style image usually affects the texture seen by the network."
          presetImages={STYLE_IMAGES}
        />
      </div>

      {/* Output */}
      {outputImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        <Card className="backdrop-blur-sm bg-card/50 overflow-hidden border-2 border-primary/20">
        <CardContent className="p-6 space-y-4">
          <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Stylization strength</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground cursor-help">
                      {styleRatio}%
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      This parameter affects the stylization strength. The higher the value,
                      the stronger the stylization. This is done via interpolation between
                      the style vectors of the content and style images.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[styleRatio]}
              onValueChange={(values) => setStyleRatio(values[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
        </motion.div>
      ) : (
        <Card className="backdrop-blur-sm bg-card/50">
        <CardContent className="p-6 space-y-4">
          <div className="aspect-video bg-gradient-to-br from-muted/50 to-transparent rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
            <p className="text-muted-foreground">Stylized image will appear here</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Stylization strength</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground cursor-help">
                      {styleRatio}%
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      This parameter affects the stylization strength. The higher the value,
                      the stronger the stylization. This is done via interpolation between
                      the style vectors of the content and style images.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider
              value={[styleRatio]}
              onValueChange={(values) => setStyleRatio(values[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleStylize}
          disabled={isProcessing || !contentImgElement || !styleImgElement}
          className="flex-1"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progress || 'Processing...'}
            </>
          ) : (
            'Stylize Image'
          )}
        </Button>
        <Button
          onClick={handleRandomize}
          variant="outline"
          size="lg"
          disabled={isProcessing}
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
