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

interface CombineStylesProps {
  onCombine: (
    contentImg: HTMLImageElement,
    styleImg1: HTMLImageElement,
    styleImg2: HTMLImageElement,
    combinationRatio: number
  ) => Promise<ImageData>;
  isProcessing: boolean;
  progress: string;
}

const CONTENT_IMAGES = [
  { value: 'statue_of_liberty', label: 'Statue of Liberty' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'golden_gate', label: 'Golden Gate' },
  { value: 'stata', label: 'Stata' },
  { value: 'diana', label: 'Diana' },
  { value: 'beach', label: 'Beach' },
];

const STYLE_IMAGES = [
  { value: 'stripes', label: 'Stripes' },
  { value: 'bricks', label: 'Bricks' },
  { value: 'seaport', label: 'Seaport' },
  { value: 'udnie', label: 'Udnie' },
  { value: 'clouds', label: 'Clouds' },
  { value: 'towers', label: 'Towers' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'red_circles', label: 'Red Circles' },
  { value: 'zigzag', label: 'Zigzag' },
];

export function CombineStyles({ onCombine, isProcessing, progress }: CombineStylesProps) {
  const [style1Src, setStyle1Src] = useState('/images/stripes.jpg');
  const [style2Src, setStyle2Src] = useState('/images/bricks.jpg');
  const [contentSrc, setContentSrc] = useState('/images/statue_of_liberty.jpg');
  const [style1Size, setStyle1Size] = useState(256);
  const [style2Size, setStyle2Size] = useState(256);
  const [contentSize, setContentSize] = useState(256);
  const [combinationRatio, setCombinationRatio] = useState(50);
  const [outputImage, setOutputImage] = useState<ImageData | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentImgElement = useImageElement(contentSrc);
  const style1ImgElement = useImageElement(style1Src);
  const style2ImgElement = useImageElement(style2Src);

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

  const handleCombine = async () => {
    if (!contentImgElement || !style1ImgElement || !style2ImgElement) {
      alert('Please wait for images to load');
      return;
    }

    try {
      const result = await onCombine(
        contentImgElement,
        style1ImgElement,
        style2ImgElement,
        combinationRatio / 100
      );
      setOutputImage(result);
    } catch (error) {
      console.error('Style combination error:', error);
      alert('Error during style combination. Please try again.');
    }
  };

  const handleRandomize = () => {
    setStyle1Size(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    setStyle2Size(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    setContentSize(Math.floor(Math.random() * (400 - 256 + 1)) + 256);
    setCombinationRatio(Math.floor(Math.random() * 101));
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
          label="Style A"
          imageSrc={style1Src}
          onImageChange={setStyle1Src}
          imageSize={style1Size}
          onSizeChange={setStyle1Size}
          minSize={100}
          maxSize={400}
          tooltip="Changing the size of a style image usually affects the texture seen by the network."
          presetImages={STYLE_IMAGES}
        />

        <ImageControls
          label="Style B"
          imageSrc={style2Src}
          onImageChange={setStyle2Src}
          imageSize={style2Size}
          onSizeChange={setStyle2Size}
          minSize={100}
          maxSize={400}
          tooltip="Changing the size of a style image usually affects the texture seen by the network."
          presetImages={STYLE_IMAGES}
        />
      </div>

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

        {outputImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
          <Card className="backdrop-blur-sm bg-card/50 overflow-hidden border-2 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
          </motion.div>
        ) : (
          <Card className="backdrop-blur-sm bg-card/50">
          <CardContent className="p-6 space-y-4">
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-transparent rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
              <p className="text-muted-foreground text-center p-4">
                Combined style result will appear here
              </p>
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="backdrop-blur-sm bg-card/50">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Style ratio (A ← → B)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs text-muted-foreground cursor-help">
                        {combinationRatio}%
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        This parameter affects the strength of the two styles relative to
                        each other. This is done via interpolation between the style vectors
                        of the two style images.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                value={[combinationRatio]}
                onValueChange={(values) => setCombinationRatio(values[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleCombine}
          disabled={
            isProcessing ||
            !contentImgElement ||
            !style1ImgElement ||
            !style2ImgElement
          }
          className="flex-1"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progress || 'Processing...'}
            </>
          ) : (
            'Combine Styles'
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
