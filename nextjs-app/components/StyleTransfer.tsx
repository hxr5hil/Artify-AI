'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Shuffle, Loader2 } from 'lucide-react';
import { ImageControls, useImageElement } from './ImageControls';

interface StyleTransferProps {
  onStylize: (
    contentImg: HTMLImageElement,
    styleImg: HTMLImageElement,
    styleRatio: number
  ) => Promise<ImageData>;
  onOutputGenerated: (imageData: ImageData) => void; // We added this!
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

export function StyleTransfer({ 
  onStylize, 
  onOutputGenerated, 
  isProcessing, 
  progress 
}: StyleTransferProps) {
  const [contentSrc, setContentSrc] = useState('/images/chicago.jpg');
  const [styleSrc, setStyleSrc] = useState('/images/seaport.jpg');
  const [contentSize, setContentSize] = useState(256);
  const [styleSize, setStyleSize] = useState(256);
  const [styleRatio, setStyleRatio] = useState(100);

  const contentImgElement = useImageElement(contentSrc);
  const styleImgElement = useImageElement(styleSrc);

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
      // Instead of saving it here, we pass it up to the parent layout
      onOutputGenerated(result);
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
    <div className="space-y-6 flex flex-col">
      {/* Changed to 1 column so it fits nicely in the sidebar */}
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

        <ImageControls
          label="Style"
          imageSrc={styleSrc}
          onImageChange={setStyleSrc}
          imageSize={styleSize}
          onSizeChange={setStyleSize}
          minSize={100}
          maxSize={400}
          tooltip="Changing size affects the texture seen by the network."
          presetImages={STYLE_IMAGES}
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Label className="text font-medium">Stylization strength</Label>
          <span className="text-sm text-muted-foreground">{styleRatio}%</span>
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

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleStylize}
          disabled={isProcessing || !contentImgElement || !styleImgElement}
          className="flex-1 bg-foreground text-background hover:bg-foreground/90"
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
    </div>
  );
}