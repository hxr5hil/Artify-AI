# Quick Start Guide

## Automated Setup (Recommended)

The easiest way to set up the project is to use the provided setup script:

### On Windows (PowerShell):
```powershell
cd nextjs-app
.\setup.ps1
```

### On Linux/Mac:
```bash
cd nextjs-app
chmod +x setup.sh
./setup.sh
```

The script will:
1. Check for required model files in the parent directory
2. Copy all model files and images to the `public` folder
3. Install npm dependencies
4. Display next steps

## Manual Setup

If you prefer to set up manually:

### 1. Install Dependencies
```bash
cd nextjs-app
npm install
```

### 2. Copy Model Files

#### Windows PowerShell:
```powershell
# From the nextjs-app directory:
New-Item -ItemType Directory -Force -Path public
Copy-Item -Recurse -Force ..\saved_model_style_js public\
Copy-Item -Recurse -Force ..\saved_model_style_inception_js public\
Copy-Item -Recurse -Force ..\saved_model_transformer_js public\
Copy-Item -Recurse -Force ..\saved_model_transformer_separable_js public\
Copy-Item -Recurse -Force ..\images public\
```

#### Linux/Mac:
```bash
# From the nextjs-app directory:
mkdir -p public
cp -r ../saved_model_style_js public/
cp -r ../saved_model_style_inception_js public/
cp -r ../saved_model_transformer_js public/
cp -r ../saved_model_transformer_separable_js public/
cp -r ../images public/
```

### 3. Verify Structure

Your `public` directory should look like this:
```
public/
├── images/
│   ├── chicago.jpg
│   ├── golden_gate.jpg
│   ├── stata.jpg
│   ├── diana.jpg
│   ├── beach.jpg
│   ├── statue_of_liberty.jpg
│   ├── seaport.jpg
│   ├── udnie.jpg
│   ├── stripes.jpg
│   ├── bricks.jpg
│   ├── clouds.jpg
│   ├── towers.jpg
│   ├── sketch.jpg
│   ├── red_circles.jpg
│   └── zigzag.jpg
├── saved_model_style_js/
│   ├── model.json
│   └── group1-shard*.bin
├── saved_model_style_inception_js/
│   ├── model.json
│   └── group1-shard*.bin
├── saved_model_transformer_js/
│   ├── model.json
│   └── group1-shard*.bin
└── saved_model_transformer_separable_js/
    ├── model.json
    └── group1-shard*.bin
```

## Running the Application

### Development Mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
npm start
```

## Troubleshooting

### Models not loading
- Verify all model files are in the `public` directory
- Check browser console for 404 errors
- Ensure model.json files are present in each model directory

### TypeScript/ESLint errors
- Run `npm install` to ensure all dependencies are installed
- These errors should resolve once dependencies are installed

### Performance issues
- Try using the faster MobileNet + Separable models
- Reduce image sizes using the sliders
- Use a modern browser (Chrome/Edge recommended)

### Out of memory errors
- Reduce content image size
- Close other browser tabs
- Refresh the page to clear TensorFlow.js memory

## Next Steps

1. Explore the two main features:
   - **Stylize an Image**: Apply a single style to a content image
   - **Combine Two Styles**: Blend two styles together

2. Experiment with different model combinations:
   - **Fast**: MobileNet + Separable Conv (12MB total)
   - **Quality**: Inception v3 + Original (44MB total)

3. Try adjusting parameters:
   - Image sizes
   - Stylization strength
   - Style combination ratios

4. Upload your own images using the file selector

## Features

- ✅ Client-side processing (privacy-first)
- ✅ Modern responsive UI with shadcn/ui
- ✅ Real-time progress indicators
- ✅ Multiple model options
- ✅ Image upload support
- ✅ Preset style and content images
- ✅ Style combination
- ✅ Adjustable parameters

Enjoy creating artistic images! 🎨
