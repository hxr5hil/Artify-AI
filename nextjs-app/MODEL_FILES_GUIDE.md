# Model Files Setup Guide

## What Model Files Do You Need?

This application requires TensorFlow.js model files from the original project. These files contain the pre-trained neural networks for style transfer.

## Required Model Directories

You need to copy these 4 model directories + 1 images directory:

1. **saved_model_style_js/** (~9.6 MB)
   - MobileNet style extraction model
   - Files: model.json + 3 shard files

2. **saved_model_style_inception_js/** (~36.3 MB)
   - Inception v3 style extraction model
   - Files: model.json + 9 shard files

3. **saved_model_transformer_js/** (~7.9 MB)
   - Original transformer model
   - Files: model.json + 2 shard files

4. **saved_model_transformer_separable_js/** (~2.4 MB)
   - Separable convolution transformer model
   - Files: model.json + 1 shard file

5. **images/** (~1-2 MB)
   - Sample content and style images
   - 15+ JPG files

## Where to Find Them

These directories should be in your original project:
```
arbitrary-image-stylization-tfjs-master/
├── saved_model_style_js/
├── saved_model_style_inception_js/
├── saved_model_transformer_js/
├── saved_model_transformer_separable_js/
└── images/
```

## Automated Copy (Recommended)

The easiest way is to use the setup scripts:

### Windows PowerShell:
```powershell
cd nextjs-app
.\setup.ps1
```

### Linux/Mac:
```bash
cd nextjs-app
chmod +x setup.sh
./setup.sh
```

The script will automatically:
1. Check for all required directories
2. Create the `public/` folder
3. Copy all model files and images
4. Install npm dependencies
5. Show you next steps

## Manual Copy

If you prefer to copy manually:

### Windows PowerShell:
```powershell
# Navigate to nextjs-app directory
cd nextjs-app

# Create public directory
New-Item -ItemType Directory -Force -Path public

# Copy each directory
Copy-Item -Recurse -Force ..\saved_model_style_js public\
Copy-Item -Recurse -Force ..\saved_model_style_inception_js public\
Copy-Item -Recurse -Force ..\saved_model_transformer_js public\
Copy-Item -Recurse -Force ..\saved_model_transformer_separable_js public\
Copy-Item -Recurse -Force ..\images public\
```

### Linux/Mac:
```bash
# Navigate to nextjs-app directory
cd nextjs-app

# Create public directory
mkdir -p public

# Copy each directory
cp -r ../saved_model_style_js public/
cp -r ../saved_model_style_inception_js public/
cp -r ../saved_model_transformer_js public/
cp -r ../saved_model_transformer_separable_js public/
cp -r ../images public/
```

### Windows File Explorer:
1. Open the original project folder
2. Select the 5 directories listed above
3. Copy them (Ctrl+C)
4. Navigate to `nextjs-app/public/`
5. Paste them (Ctrl+V)

## Verify the Copy

After copying, your directory structure should look like:

```
nextjs-app/
└── public/
    ├── images/
    │   ├── beach.jpg
    │   ├── bricks.jpg
    │   ├── chicago.jpg
    │   ├── clouds.jpg
    │   ├── diana.jpg
    │   ├── golden_gate.jpg
    │   ├── red_circles.jpg
    │   ├── seaport.jpg
    │   ├── sketch.jpg
    │   ├── stata.jpg
    │   ├── statue_of_liberty.jpg
    │   ├── stripes.jpg
    │   ├── towers.jpg
    │   ├── udnie.jpg
    │   └── zigzag.jpg
    │
    ├── saved_model_style_js/
    │   ├── model.json
    │   ├── group1-shard1of3
    │   ├── group1-shard2of3
    │   └── group1-shard3of3
    │
    ├── saved_model_style_inception_js/
    │   ├── model.json
    │   ├── group1-shard1of9
    │   ├── group1-shard2of9
    │   ├── group1-shard3of9
    │   ├── group1-shard4of9
    │   ├── group1-shard5of9
    │   ├── group1-shard6of9
    │   ├── group1-shard7of9
    │   ├── group1-shard8of9
    │   └── group1-shard9of9
    │
    ├── saved_model_transformer_js/
    │   ├── model.json
    │   ├── group1-shard1of2
    │   └── group1-shard2of2
    │
    └── saved_model_transformer_separable_js/
        ├── model.json
        └── group1-shard1of1
```

## Verification Checklist

✅ Each model directory has a `model.json` file
✅ Each model directory has the correct number of shard files
✅ The `images/` directory contains 15 JPG files
✅ All files are in the `public/` subdirectory
✅ Total size is approximately 55-60 MB

## What If Files Are Missing?

If you're missing model files from the original project:

1. **Check the original repository:**
   - https://github.com/reiinakano/arbitrary-image-stylization-tfjs

2. **Download or clone the original project:**
   ```bash
   git clone https://github.com/reiinakano/arbitrary-image-stylization-tfjs.git
   ```

3. **The models should be included in the repository**

## Troubleshooting

### "Model files not found" error
- Verify files are in `public/` not in `nextjs-app/` root
- Check that `model.json` files exist
- Ensure shard files are present

### "Failed to load model" error
- Check file paths in browser DevTools
- Verify files aren't corrupted
- Try re-copying the files

### Models load slowly
- This is normal - total size is ~55MB
- First load always takes longer
- Models are cached after first load

## File Sizes

Expected file sizes:
- **saved_model_style_js**: ~9.6 MB
- **saved_model_style_inception_js**: ~36.3 MB
- **saved_model_transformer_js**: ~7.9 MB
- **saved_model_transformer_separable_js**: ~2.4 MB
- **images**: ~1-2 MB
- **Total**: ~55-60 MB

## Next Steps

After copying model files:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open Browser:**
   Navigate to http://localhost:3000

4. **Wait for Models to Load:**
   - First time takes 10-30 seconds
   - Subsequent loads are faster
   - Progress shown in UI

## Need Help?

- Check QUICKSTART.md for setup guide
- Review SUMMARY.md for overview
- See PROJECT_OVERVIEW.md for details
- Open browser console for error messages

---

**Ready?** Run the setup script or manually copy the files, then proceed with npm install and npm run dev!
