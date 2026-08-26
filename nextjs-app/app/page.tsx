'use client';

import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StyleTransfer } from '@/components/StyleTransfer';
import { CombineStyles } from '@/components/CombineStyles';
import { useStyleTransfer, StyleModelType, TransformerModelType } from '@/hooks/useStyleTransfer';
import { Github as GithubIcon, Sparkles, Palette, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const {
    isLoading,
    error,
    loadModels,
    stylizeImage,
    combineStyles,
    progress,
  } = useStyleTransfer();

  const [styleModel, setStyleModel] = useState<StyleModelType>('mobilenet');
  const [transformerModel, setTransformerModel] = useState<TransformerModelType>('separable');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [outputImage, setOutputImage] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleStyleModelChange = (value: string) => {
    const newValue = value as StyleModelType;
    setStyleModel(newValue);
    loadModels(newValue, transformerModel);
  };

  const handleTransformerModelChange = (value: string) => {
    const newValue = value as TransformerModelType;
    setTransformerModel(newValue);
    loadModels(styleModel, newValue);
  };

  const handleStylize = async (
    contentImg: HTMLImageElement,
    styleImg: HTMLImageElement,
    styleRatio: number,
    contentDim: number,
    styleDim: number
  ) => {
    setIsProcessing(true);
    // Force the browser to render the loading state on the screen
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      return await stylizeImage(contentImg, styleImg, styleRatio, contentDim, styleDim);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCombine = async (
    contentImg: HTMLImageElement,
    styleImg1: HTMLImageElement,
    styleImg2: HTMLImageElement,
    combinationRatio: number
  ) => {
    setIsProcessing(true);
    // Force the browser to render the loading state on the screen
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      return await combineStyles(contentImg, styleImg1, styleImg2, combinationRatio);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <header className="border-b border-border flex-none bg-card">
        <div className="px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="relative w-11 h-11 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_8px_16px_rgba(0,0,0,0.4)]"></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.4),inset_3px_3px_10px_rgba(255,255,255,0.6)]"></div>
              <div className="absolute top-1.5 left-2.5 w-4 h-2.5 bg-white/50 rounded-full blur-[0.5px] rotate-[-45deg]"></div>
              <Sparkles className="w-5 h-5 text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            </div>
            
            <div>
              <h1 
                className="text-3xl font-black tracking-tighter text-gray-100"
                style={{
                  textShadow: `
                    0 1px 0 #71717a, 
                    0 2px 0 #52525b, 
                    0 3px 0 #3f3f46, 
                    0 4px 0 #27272a,
                    0 6px 8px rgba(0,0,0,0.6)
                  `
                }}
              >
                Artify
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-base">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-medium">Style:</span>
                <Select value={styleModel} onValueChange={handleStyleModelChange}>
                  <SelectTrigger disabled={isLoading || isProcessing} className="h-10 w-[150px] bg-background border-border text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobilenet" className="text-base">MobileNet</SelectItem>
                    <SelectItem value="inception" className="text-base">Inception v3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-medium">Transformer:</span>
                <Select value={transformerModel} onValueChange={handleTransformerModelChange}>
                  <SelectTrigger disabled={isLoading || isProcessing} className="h-10 w-[150px] bg-background border-border text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="separable" className="text-base">Separable</SelectItem>
                    <SelectItem value="original" className="text-base">Original</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="w-px h-6 bg-border hidden md:block"></div>

            <a
              href="https://github.com/hxr5hil/Artify-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <aside className="lg:col-span-4 border-r border-border bg-card overflow-y-auto p-6 flex flex-col">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <Alert className="mb-6 bg-muted border-border text-muted-foreground">
              <AlertDescription className="flex items-center gap-2 text-base">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading neural networks...
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="stylize" className="w-full flex-1 flex flex-col">
            <TabsList className="bg-muted p-1 grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="stylize" className="text-base py-2">Stylize</TabsTrigger>
              <TabsTrigger value="combine" className="text-base py-2">Combine</TabsTrigger>
            </TabsList>

            <TabsContent value="stylize" className="mt-0 outline-none flex-1">
              <StyleTransfer
                onStylize={handleStylize}
                onOutputGenerated={setOutputImage}
                isProcessing={isProcessing}
                progress={progress}
              />
            </TabsContent>

            <TabsContent value="combine" className="mt-0 outline-none flex-1">
              <CombineStyles
                onCombine={handleCombine}
                onOutputGenerated={setOutputImage}
                isProcessing={isProcessing}
                progress={progress}
              />
            </TabsContent>
          </Tabs>
        </aside>

        <section className="lg:col-span-8 p-6 flex flex-col items-center justify-center bg-background overflow-hidden relative">
          {outputImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <div className="w-full flex-1 min-h-0 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain rounded-md shadow-2xl border border-border"
                />
              </div>
              <button
                onClick={() => {
                  if (canvasRef.current) {
                    const link = document.createElement('a');
                    link.download = 'artify-artwork.png';
                    link.href = canvasRef.current.toDataURL('image/png');
                    link.click();
                  }
                }}
                className="px-8 py-3 bg-foreground text-background text-base font-semibold rounded-md hover:bg-foreground/90 transition-colors shrink-0"
              >
                Download Artwork
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-lg p-12 text-center text-muted-foreground w-full max-w-2xl flex flex-col items-center">
              <Palette className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-semibold text-xl text-foreground">Canvas Output</p>
              <p className="text-base mt-2">Upload your images on the left and click Stylize to generate artwork.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}