# 🎨 Image Stylization - Modern Next.js Implementation

A complete modern reimplementation of the arbitrary style transfer project using Next.js 14, React, TypeScript, shadcn/ui, and TensorFlow.js.

## 📋 Project Overview

This project has been completely rebuilt from scratch with:
- **Next.js 14** with App Router
- **React 18** with hooks
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** for beautiful, accessible UI components
- **TensorFlow.js** for ML inference in the browser
- **Framer Motion** for smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Model files from the original project

### Installation

1. **Automated Setup (Recommended)**

   **Windows PowerShell:**
   ```powershell
   cd nextjs-app
   .\setup.ps1
   ```

   **Linux/Mac:**
   ```bash
   cd nextjs-app
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page with tabs
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── CombineStyles.tsx    # Style combination component
│   ├── ImageControls.tsx    # Reusable image control component
│   └── StyleTransfer.tsx    # Main style transfer component
├── hooks/
│   └── useStyleTransfer.ts  # Custom hook for TensorFlow.js logic
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── images/              # Sample images (copied from original)
│   └── saved_model_*/       # TensorFlow.js models (copied from original)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── README.md
├── QUICKSTART.md
├── setup.ps1                # Windows setup script
└── setup.sh                 # Linux/Mac setup script
```

## ✨ Features

### Core Features
- ✅ **Arbitrary Style Transfer**: Apply any artistic style to any content image
- ✅ **Style Combination**: Blend two different styles with adjustable ratios
- ✅ **Multiple Models**: Choose between speed and quality
- ✅ **Real-time Processing**: All computation happens in the browser
- ✅ **Privacy First**: Images never leave your device

### UI/UX Features
- ✅ **Modern Design**: Beautiful, responsive UI with shadcn/ui
- ✅ **Dark Mode Ready**: Full dark mode support
- ✅ **Tooltips**: Helpful explanations for all parameters
- ✅ **Progress Indicators**: Real-time feedback during processing
- ✅ **Image Upload**: Support for custom images
- ✅ **Preset Images**: Quick start with sample images
- ✅ **Parameter Sliders**: Fine-tune all aspects
- ✅ **Randomize Button**: Experiment with random settings

### Technical Features
- ✅ **TypeScript**: Full type safety
- ✅ **Server Components**: Optimized Next.js 14 architecture
- ✅ **Client Components**: Interactive UI where needed
- ✅ **Model Caching**: Efficient model loading
- ✅ **Memory Management**: Proper TensorFlow.js tensor disposal
- ✅ **Error Handling**: Graceful error states

## 🎯 Usage

### Stylize an Image

1. Select or upload a content image
2. Select or upload a style image
3. Adjust image sizes using sliders
4. Set stylization strength (0-100%)
5. Click "Stylize Image"
6. Download or save the result

### Combine Two Styles

1. Select or upload two style images
2. Select or upload a content image
3. Adjust all image sizes
4. Set the combination ratio (Style A ← → Style B)
5. Click "Combine Styles"
6. Download or save the result

### Model Selection

**Style Networks:**
- **MobileNet (9.6MB)**: Fast, good quality ⚡
- **Inception v3 (36.3MB)**: High quality, slower 🎨

**Transformer Networks:**
- **Separable Conv (2.4MB)**: Fast, efficient ⚡
- **Original (7.9MB)**: High quality, slower 🎨

**Recommended Combinations:**
- **Fast Mode**: MobileNet + Separable (12MB total)
- **Quality Mode**: Inception v3 + Original (44MB total)

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with hooks
- **TypeScript 5**: Type safety

### Styling
- **TailwindCSS 3**: Utility-first CSS
- **shadcn/ui**: Beautiful React components
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations

### Machine Learning
- **TensorFlow.js 4**: Browser ML inference
- **WebGL Backend**: GPU acceleration

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS compatibility

## 🎨 Components

### Custom Components

**StyleTransfer.tsx**
- Main interface for single style transfer
- Content and style image controls
- Stylization strength slider
- Output display

**CombineStyles.tsx**
- Interface for combining two styles
- Dual style image controls
- Combination ratio slider
- Output display

**ImageControls.tsx**
- Reusable image selection component
- File upload support
- Size adjustment slider
- Preset image selector

### shadcn/ui Components

All UI components are from shadcn/ui:
- Button, Card, Input, Label
- Slider, Select, Tabs
- Tooltip, Alert
- Checkbox, Textarea

## 🔧 Configuration

### TensorFlow.js Settings
```typescript
tf.ENV.set('WEBGL_PACK', false); // Important for stability
```

### Model Paths
Models are served from `/public`:
- `/saved_model_style_js/model.json`
- `/saved_model_style_inception_js/model.json`
- `/saved_model_transformer_js/model.json`
- `/saved_model_transformer_separable_js/model.json`

## 📊 Performance

### Model Sizes
- MobileNet Style: ~9.6MB
- Inception Style: ~36.3MB
- Separable Transformer: ~2.4MB
- Original Transformer: ~7.9MB

### Processing Time (approximate)
- **Fast Mode** (256px image): 2-5 seconds
- **Quality Mode** (256px image): 5-15 seconds
- Larger images increase processing time significantly

### Memory Usage
- Models: 50-200MB RAM
- Processing: 100-500MB RAM depending on image size
- Recommend: 8GB+ RAM for best experience

## 🐛 Troubleshooting

### Common Issues

**Models not loading**
- Check that model files are in `/public` directory
- Verify all `model.json` files exist
- Check browser console for 404 errors

**Out of memory**
- Reduce image sizes
- Use faster/smaller models
- Close other browser tabs
- Refresh page to clear memory

**Slow processing**
- Use MobileNet + Separable models
- Reduce image sizes
- Try a different browser (Chrome/Edge recommended)
- Check GPU acceleration is enabled

**TypeScript errors**
- Run `npm install`
- Delete `node_modules` and reinstall
- Check Node.js version (18+)

## 🌐 Browser Support

- ✅ Chrome/Edge 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ Mobile browsers (limited by device memory)

## 📝 License

Apache License 2.0

## 🙏 Credits

### Original Implementation
- [Reiichiro Nakano](https://github.com/reiinakano) - Original JavaScript implementation
- [Original Repository](https://github.com/reiinakano/arbitrary-image-stylization-tfjs)

### Research
- [Arbitrary Style Transfer Paper](https://arxiv.org/abs/1705.06830)
- [TensorFlow Magenta](https://github.com/tensorflow/magenta)

### Technologies
- [Next.js](https://nextjs.org/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. Create component in `components/`
2. Add types in TypeScript
3. Use shadcn/ui components
4. Follow existing patterns
5. Test in browser

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind for styling
- Keep components modular
- Add proper error handling

## 📧 Support

For issues and questions:
1. Check [QUICKSTART.md](./QUICKSTART.md)
2. Review troubleshooting section
3. Check browser console
4. Open an issue on GitHub

## 🎉 Enjoy!

Have fun creating artistic images with AI! 🎨✨
