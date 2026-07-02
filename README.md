# Arbitrary Image Stylization - Next.js Implementation

A modern reimplementation of arbitrary style transfer using Next.js 14, React, TypeScript, shadcn/ui, and TensorFlow.js.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.14-orange)

## 🎨 About

This application allows you to stylize images with any artistic style directly in your browser. All processing happens client-side using TensorFlow.js - your images never leave your device!

## ✨ Features

- **Arbitrary Style Transfer**: Apply any artistic style to any content image
- **Style Combination**: Blend two different styles with adjustable ratios
- **Multiple Models**: Choose between speed and quality (MobileNet/Inception + Separable/Original)
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui
- **Privacy First**: All processing happens in your browser
- **Real-time Preview**: See results instantly

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivbera18/arbitrary-style-transfer.git
   cd arbitrary-image-stylization-nextjs
   ```

2. **Navigate to the app directory**
   ```bash
   cd nextjs-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
arbitrary-image-stylization-nextjs/
├── nextjs-app/              # Main Next.js application
│   ├── app/                 # Next.js 14 App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── StyleTransfer.tsx
│   │   ├── CombineStyles.tsx
│   │   └── ImageControls.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useStyleTransfer.ts
│   ├── lib/                 # Utilities
│   ├── public/              # Static assets
│   │   ├── images/          # Sample images
│   │   └── saved_model_*/   # TensorFlow.js models
│   └── package.json
├── README.md
└── LICENSE
```

## 🎯 Usage

### Stylize an Image

1. Select or upload a content image
2. Select or upload a style image
3. Adjust parameters (size, strength)
4. Click "Stylize Image"

### Combine Two Styles

1. Select two style images
2. Select a content image
3. Adjust the combination ratio
4. Click "Combine Styles"

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **ML**: TensorFlow.js 4.14
- **Components**: Radix UI primitives
- **Icons**: Lucide React

## 📊 Models

The application uses pre-trained TensorFlow.js models:

- **MobileNet Style Network** (9.6MB) - Fast style extraction
- **Inception Style Network** (36.3MB) - High-quality style extraction
- **Separable Transformer** (2.4MB) - Fast transformation
- **Original Transformer** (7.9MB) - High-quality transformation

## 🌐 Browser Support

- Chrome/Edge 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Mobile browsers (limited performance)

## 📝 Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 🙏 Credits

### Original Implementation
- [Reiichiro Nakano](https://github.com/reiinakano) - Original JavaScript implementation
- [Original Repository](https://github.com/reiinakano/arbitrary-image-stylization-tfjs)

### Research
- [Arbitrary Style Transfer Paper](https://arxiv.org/abs/1705.06830)
- [TensorFlow Magenta](https://github.com/tensorflow/magenta)

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Enjoy creating art with AI!** 🎨✨
