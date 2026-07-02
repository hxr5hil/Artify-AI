'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StyleTransfer } from '@/components/StyleTransfer';
import { CombineStyles } from '@/components/CombineStyles';
import { useStyleTransfer, StyleModelType, TransformerModelType } from '@/hooks/useStyleTransfer';
import { Github, Palette, Loader2 } from 'lucide-react';
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
    styleRatio: number
  ) => {
    setIsProcessing(true);
    try {
      return await stylizeImage(contentImg, styleImg, styleRatio);
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
    try {
      return await combineStyles(contentImg, styleImg1, styleImg2, combinationRatio);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1614] text-[#EAF3F0] relative overflow-hidden">
      {/* Ambient gallery glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#E2975A] opacity-[0.12] blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-[26rem] h-[26rem] rounded-full bg-[#34D399] opacity-[0.12] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] rounded-full bg-[#C2495D] opacity-[0.08] blur-[120px]" />
      </div>

      {/* Header */}
      <header className="border-b border-[#EAF3F0]/10 sticky top-0 z-50 bg-[#0B1614]/85 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E2975A] to-[#34D399] blur-md opacity-60" />
                <div className="relative p-2 rounded-full bg-[#12211F] border border-[#EAF3F0]/10">
                  <Palette className="w-5 h-5 text-[#E2975A]" strokeWidth={1.75} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold leading-none tracking-tight bg-gradient-to-r from-[#E2975A] to-[#34D399] bg-clip-text text-transparent">
                  Artify AI - Arbitrary Style Transfer
                </h1>
                <p className="text-xs text-[#7D9B95] mt-1.5">Powered by TensorFlow.js</p>
              </div>
            </div>
            <a
              href="https://github.com/hxr5hil/Artify-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#9CB8B2] hover:text-[#E2975A] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Status Messages */}
        {error && (
          <Alert className="mb-6 max-w-3xl mx-auto bg-[#C2495D]/10 border-[#C2495D]/40 text-[#F3C2CC]">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <Alert className="mb-6 max-w-3xl mx-auto bg-[#34D399]/10 border-[#34D399]/40 text-[#BEF2DD]">
            <AlertDescription className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading models, please wait…
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          <Tabs defaultValue="stylize" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#12211F] border border-[#EAF3F0]/10 p-1 h-auto">
              <TabsTrigger
                value="stylize"
                className="py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2975A] data-[state=active]:to-[#34D399] data-[state=active]:text-[#0B1614] data-[state=active]:font-medium text-[#9CB8B2]"
              >
                Stylize an image
              </TabsTrigger>
              <TabsTrigger
                value="combine"
                className="py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E2975A] data-[state=active]:to-[#34D399] data-[state=active]:text-[#0B1614] data-[state=active]:font-medium text-[#9CB8B2]"
              >
                Combine two styles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stylize" className="mt-6">
              <StyleTransfer
                onStylize={handleStylize}
                isProcessing={isProcessing}
                progress={progress}
              />
            </TabsContent>

            <TabsContent value="combine" className="mt-6">
              <CombineStyles
                onCombine={handleCombine}
                isProcessing={isProcessing}
                progress={progress}
              />
            </TabsContent>
          </Tabs>

          {/* Model Selection */}
          <Card className="bg-[#12211F] border border-[#EAF3F0]/10 rounded-2xl overflow-hidden shadow-xl shadow-black/30 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E2975A] to-[#34D399]" />
            <CardHeader>
              <CardTitle className="text-base text-[#EAF3F0]">Model settings</CardTitle>
              <CardDescription className="text-[#7D9B95]">
                Choose different models for speed vs. quality
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#EAF3F0]">Style network</label>
                <Select value={styleModel} onValueChange={handleStyleModelChange}>
                  <SelectTrigger
                    disabled={isLoading || isProcessing}
                    className="bg-[#0B1614] border-[#EAF3F0]/10 text-[#EAF3F0]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12211F] border-[#EAF3F0]/10 text-[#EAF3F0]">
                    <SelectItem value="mobilenet">Fast — MobileNet (9.6MB)</SelectItem>
                    <SelectItem value="inception">Quality — Inception v3 (36.3MB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#EAF3F0]">Transformer network</label>
                <Select value={transformerModel} onValueChange={handleTransformerModelChange}>
                  <SelectTrigger
                    disabled={isLoading || isProcessing}
                    className="bg-[#0B1614] border-[#EAF3F0]/10 text-[#EAF3F0]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12211F] border-[#EAF3F0]/10 text-[#EAF3F0]">
                    <SelectItem value="separable">Fast — Separable Conv (2.4MB)</SelectItem>
                    <SelectItem value="original">Quality — Original (7.9MB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="bg-[#12211F] border border-[#EAF3F0]/10 rounded-2xl overflow-hidden shadow-xl shadow-black/30 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#34D399] to-[#E2975A]" />
            <CardHeader>
              <CardTitle className="text-base text-[#EAF3F0]">About this demo</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm prose-invert max-w-none text-[#9CB8B2]">
              <p>
                This is an implementation of arbitrary style transfer running entirely in your
                browser using TensorFlow.js. The neural network attempts to &quot;draw&quot; one picture
                (the content) in the style of another (the style).
              </p>
              <p>
                Unlike traditional style transfer implementations that require a separate neural
                network for each style, this uses a{' '}
                <strong className="text-[#E2975A]">style network</strong> that breaks down any
                image into a 100-dimensional style vector. This vector is then fed into a{' '}
                <strong className="text-[#34D399]">transformer network</strong> along with the
                content image to produce the final stylized result.
              </p>
              <h3 className="text-sm font-semibold mt-4 text-[#EAF3F0]">Privacy &amp; security</h3>
              <p>
                All processing happens locally in your browser. Your images never leave your
                computer — we send you the models and code to run them, not the other way around.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#EAF3F0]/10 mt-12 py-6 relative z-10">
        <div className="container mx-auto px-4 text-center text-sm text-[#7D9B95]">
          Based on the{' '}
          <a
            href="https://arxiv.org/abs/1705.06830"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#E2975A]/50 hover:text-[#E2975A] transition-colors"
          >
            Arbitrary Style Transfer
          </a>{' '}
          paper
        </div>
      </footer>
    </main>
  );
}