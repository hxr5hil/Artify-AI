# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push -u origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository: `shivbera18/arbitrary-style-transfer`

3. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: **nextjs-app**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (~3-5 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the nextjs-app directory**:
   ```bash
   cd nextjs-app
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `arbitrary-style-transfer`
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. **Production Deployment**:
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration

### Environment Variables
No environment variables are required for this project as everything runs client-side.

### Build Settings
The project is configured with:
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `next dev`

## 📝 Notes

- The app includes ~55MB of TensorFlow.js models - Vercel's free tier supports this
- All processing happens client-side, so no serverless functions are used
- First load may be slower due to model downloads
- Models are cached in the browser after first load

## 🔧 Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check that Node.js version is 18 or higher in Vercel settings

### Models Not Loading
- Verify model files are in `public/saved_model_*` directories
- Check browser console for CORS or network errors

### Performance Issues
- Models total ~55MB and load on first visit
- Subsequent visits use cached models
- Consider using edge functions for model serving (advanced)

## 🌐 Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 Analytics

Enable Vercel Analytics for insights:
1. Go to your project on Vercel
2. Navigate to "Analytics" tab
3. Enable Web Analytics

---

**Your app will be live at**: `https://arbitrary-style-transfer.vercel.app`
