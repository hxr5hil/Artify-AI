# Setup script for Next.js Image Stylization App
# This script will copy model files and images from the original project

Write-Host "Setting up Next.js Image Stylization App..." -ForegroundColor Green
Write-Host ""

# Check if we're in the nextjs-app directory
$currentDir = Get-Location
if ($currentDir.Path -notlike "*nextjs-app") {
    Write-Host "Please run this script from the nextjs-app directory" -ForegroundColor Red
    exit 1
}

# Check if parent directory has the required files
$parentDir = Split-Path -Parent $currentDir
$requiredDirs = @(
    "saved_model_style_js",
    "saved_model_style_inception_js", 
    "saved_model_transformer_js",
    "saved_model_transformer_separable_js",
    "images"
)

Write-Host "Checking for required model directories..." -ForegroundColor Yellow
$missingDirs = @()
foreach ($dir in $requiredDirs) {
    $fullPath = Join-Path $parentDir $dir
    if (-not (Test-Path $fullPath)) {
        $missingDirs += $dir
    }
}

if ($missingDirs.Count -gt 0) {
    Write-Host "ERROR: Missing required directories:" -ForegroundColor Red
    $missingDirs | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Please ensure you have the original project files in the parent directory." -ForegroundColor Yellow
    exit 1
}

# Create public directory if it doesn't exist
Write-Host "Creating public directory..." -ForegroundColor Yellow
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir | Out-Null
}

# Copy directories
Write-Host ""
Write-Host "Copying model files and images..." -ForegroundColor Yellow
foreach ($dir in $requiredDirs) {
    $source = Join-Path $parentDir $dir
    $destination = Join-Path $publicDir $dir
    
    Write-Host "  Copying $dir..." -ForegroundColor Cyan
    
    if (Test-Path $destination) {
        Remove-Item -Recurse -Force $destination
    }
    
    Copy-Item -Recurse -Force $source $destination
}

Write-Host ""
Write-Host "✓ Model files and images copied successfully!" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Write-Host "Please run 'npm install' manually" -ForegroundColor Yellow
    exit 1
}
