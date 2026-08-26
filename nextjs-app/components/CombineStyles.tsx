'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Shuffle, Loader2 } from 'lucide-react';
import { ImageControls, useImageElement } from './ImageControls';

interface CombineStylesProps {
  onCombine: (
    contentImg: HTMLImageElement,
    styleImg1: HTMLImageElement,
    styleImg2: HTMLImageElement,
    combinationRatio: number
  ) => Promise<ImageData>;
  onOutputGenerated: (imageData: ImageData) => void;
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

export function CombineStyles({
  onCombine,
  onOutputGenerated,
  isProcessing,
  progress,
}: CombineStylesProps) {
  const [contentSrc, setContentSrc] = useState('/images/chicago.jpg');
  const [style1Src, setStyle1Src] = useState('/images/seaport.jpg');
  const [style2Src, setStyle2Src] = useState('/images/udnie.jpg');
  
  const [contentSize, setContentSize] = useState(256);
  const [style1Size, setStyle1Size] = useState(256);
  const [style2Size, setStyle2Size] = useState(256);
  
  const [combinationRatio, setCombinationRatio] = useState(50);

  const contentImgElement = useImageElement(contentSrc);
  const styleImg1Element = useImageElement(style1Src);
  const styleImg2Element = useImageElement(style2Src);

  const handleCombine = async () => {
    if (!contentImgElement || !styleImg1Element || !styleImg2Element) {
      alert('Please wait for images to load');
      return;
    }

    try {
      const result = await onCombine(
        contentImgElement,
        styleImg1Element,
        styleImg2Element,
        combinationRatio / 100
      );
      onOutputGenerated(result);
    } catch (error) {
      console.error('Combination error:', error);
      alert('Error during stylization. Please try again.');
    }
  };

  const handleRandomize = () => {
    setContentSize(Math.floor(Math.random() * (400 - 256 + 1)) + 256);
    setStyle1Size(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    setStyle2Size(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
    setCombinationRatio(Math.floor(Math.random() * 101));
  };

  return (
    <div className="space-y-6 flex flex-col">
      <div className="grid grid-cols-1 gap-6">
        <ImageControls
          label="Content"
          imageSrc={contentSrc}
          onImageChange={setContentSrc}
          imageSize={contentSize}
          onSizeChange={setContentSize}
          minSize={256}
          maxSize={400}
          tooltip="Larger images give more detail but take longer to process."
          presetImages={CONTENT_IMAGES}
        />

        <div className="grid grid-cols-2 gap-4">
          <ImageControls
            label="Style 1"
            imageSrc={style1Src}
            onImageChange={setStyle1Src}
            imageSize={style1Size}
            onSizeChange={setStyle1Size}
            minSize={100}
            maxSize={400}
            presetImages={STYLE_IMAGES}
          />

          <ImageControls
            label="Style 2"
            imageSrc={style2Src}
            onImageChange={setStyle2Src}
            imageSize={style2Size}
            onSizeChange={setStyle2Size}
            minSize={100}
            maxSize={400}
            presetImages={STYLE_IMAGES}
          />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Style Blend</Label>
          <span className="text-base text-muted-foreground">{combinationRatio}% Style 2</span>
        </div>
        <Slider
          value={[combinationRatio]}
          onValueChange={(values) => setCombinationRatio(values[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>More Style 1</span>
          <span>More Style 2</span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleCombine}
          disabled={isProcessing || !contentImgElement || !styleImg1Element || !styleImg2Element}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90"
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
    </div>
  );
}