'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { resizeImageFile } from '../lib/resize';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Upload, Camera } from 'lucide-react';
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
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Shrink the image to a max width of 600px before the app processes it
        const safeImage = await resizeImageFile(file, 600);
        
        // Pass the safe, compressed image back to your app
        onImageChange(safeImage);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === 'file') {
      fileInputRef.current?.click();
    } else {
      onImageChange(`/images/${value}.jpg`);
    }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/50 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <motion.div
          className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            ref={setImgElement}
            src={imageSrc}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            crossOrigin="anonymous"
          />
        </motion.div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">{label} size</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-muted-foreground cursor-help">
                    {imageSize}px
                  </span>
                </TooltipTrigger>
                {tooltip && (
                  <TooltipContent>
                    <p className="max-w-xs">{tooltip}</p>
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

        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="file">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Select from file
              </div>
            </SelectItem>
            {presetImages.map((img) => (
              <SelectItem key={img.value} value={img.value}>
                {img.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </CardContent>
    </Card>
  );
}

// Export the image element getter hook
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
