# Image Stylization App - Next.js + TensorFlow.js

A modern implementation of arbitrary style transfer using Next.js, React, shadcn/ui, and TensorFlow.js. This application allows you to stylize images with any artistic style directly in your browser.

## Features

- 🎨 **Arbitrary Style Transfer**: Apply any style to any content image
- 🔄 **Style Combination**: Blend two different styles together
- 📱 **Responsive Design**: Modern UI with shadcn/ui components
- 🚀 **Client-Side Processing**: All processing happens in your browser
- 🔒 **Privacy First**: Your images never leave your device

## Prerequisites

- Node.js 18+ installed
- Model files from the original project

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Copy Model Files

You need to copy the TensorFlow.js model files from the original project to the `public` directory:

\`\`\`bash
# From the root of the original project, copy the model directories:
# On Windows PowerShell:
Copy-Item -Recurse "../saved_model_style_js" "public/"
Copy-Item -Recurse "../saved_model_style_inception_js" "public/"
Copy-Item -Recurse "../saved_model_transformer_js" "public/"
Copy-Item -Recurse "../saved_model_transformer_separable_js" "public/"
Copy-Item -Recurse "../images" "public/"

# On Linux/Mac:
cp -r ../saved_model_style_js public/
cp -r ../saved_model_style_inception_js public/
cp -r ../saved_model_transformer_js public/
cp -r ../saved_model_transformer_separable_js public/
cp -r ../images public/
\`\`\`

The final structure should look like:
\`\`\`
public/
  ├── images/
  ├── saved_model_style_js/
  ├── saved_model_style_inception_js/
  ├── saved_model_transformer_js/
  └── saved_model_transformer_separable_js/
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## How It Works

### Style Transfer Models

The application uses two neural networks:

1. **Style Network**: Extracts a 100-dimensional style vector from any image
   - MobileNet version (9.6MB) - Fast, good quality
   - Inception v3 version (36.3MB) - Higher quality, slower

2. **Transformer Network**: Combines the content image with the style vector
   - Separable convolution version (2.4MB) - Fast, efficient
   - Original version (7.9MB) - Higher quality

### Features

- **Stylize an Image**: Apply a single style to a content image
- **Combine Styles**: Blend two different styles with adjustable ratio
- **Adjustable Parameters**:
  - Content image size
  - Style image size  
  - Stylization strength
  - Style combination ratio

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: TailwindCSS
- **Components**: shadcn/ui (Radix UI primitives)
- **ML**: TensorFlow.js
- **Language**: TypeScript
- **Animations**: Framer Motion

## Project Structure

\`\`\`
nextjs-app/
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── StyleTransfer.tsx   # Main style transfer component
│   └── CombineStyles.tsx   # Style combination component
├── hooks/
│   └── useStyleTransfer.ts # TensorFlow.js logic
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    ├── images/             # Sample images
    └── saved_model_*/      # TensorFlow.js models
\`\`\`

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support (may be slower)
- Mobile: Supported but may have performance limitations

## Credits

Original implementation by [Reiichiro Nakano](https://github.com/reiinakano)

Based on the [Arbitrary Style Transfer](https://arxiv.org/abs/1705.06830) paper.

## License

Apache License 2.0
