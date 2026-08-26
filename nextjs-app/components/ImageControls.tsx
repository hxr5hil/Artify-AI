'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { resizeImageFile } from '../lib/resize';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ImageControlsProps {
  label: string;
  imageSrc: string;
  onImageChange: (src: string) => void;
  imageSize: number;
  onSizeChange: (size: number) => void;
  minSize?: number;
  maxSize?: number;
  tooltip?: string;
  presetImages: { value: string; label: string }[];
}

export function ImageControls({
  label,
  imageSrc,
  onImageChange,
  imageSize,
  onSizeChange,
  minSize = 100,
  maxSize = 400,
  tooltip,
  presetImages,
}: ImageControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const safeImage = await resizeImageFile(file, 600);
        onImageChange(safeImage);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{label} Image</Label>
      </div>

      {/* Real-time scaling preview container */}
      <div className="relative w-full aspect-square bg-muted rounded-md overflow-hidden border border-border flex items-center justify-center">
        <img
          src={imageSrc}
          alt={label}
          style={{ 
            transform: `scale(${Math.min(1 + (imageSize - minSize) / (maxSize - minSize) * 0.15, 1.15)})` 
          }}
          className="w-full h-full object-cover transition-transform duration-75 ease-out"
          crossOrigin="anonymous"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono pointer-events-none">
          {imageSize}px
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center bg-secondary border border-border rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          title="Upload new image"
        >
          <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Upload</span>
        </button>
        
        {presetImages.map((img) => {
          const presetSrc = `/images/${img.value}.jpg`;
          const isActive = imageSrc === presetSrc;
          
          return (
            <button
              key={img.value}
              onClick={() => onImageChange(presetSrc)}
              title={img.label}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                isActive 
                  ? 'border-foreground' 
                  : 'border-transparent hover:border-muted-foreground'
              }`}
            >
              <img
                src={presetSrc}
                alt={img.label}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </button>
          );
        })}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Resolution</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-muted-foreground cursor-help font-mono bg-secondary px-2 py-1 rounded">
                  {imageSize}px
                </span>
              </TooltipTrigger>
              {tooltip && (
                <TooltipContent>
                  <p className="max-w-xs text-sm">{tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        <Slider
          value={[imageSize]}
          onValueChange={(values) => onSizeChange(values[0])}
          min={minSize}
          max={maxSize}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function useImageElement(src: string) {
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImgElement(img);
    img.src = src;
  }, [src]);

  return imgElement;
}