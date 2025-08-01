# Deployment Guide

## GitHub Pages Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `quiz-master-app`)
5. Make it public or private (your choice)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Push Your Code to GitHub

```bash
# Add the remote repository (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/quiz-master-app.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### 3. Deploy to GitHub Pages

#### Option A: Using GitHub Actions (Recommended)

1. Create a `.github/workflows` directory in your project
2. Create a file called `deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

3. Go to your repository settings on GitHub
4. Navigate to "Pages" in the sidebar
5. Under "Source", select "Deploy from a branch"
6. Choose "gh-pages" branch and "/ (root)" folder
7. Click "Save"

#### Option B: Manual Deployment

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Configure GitHub Pages as described in Option A

### 4. Configure Environment Variables

For the Gemini API to work in production:

1. Create a `.env` file in your project root:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

2. Update `src/services/geminiApi.ts`:
```typescript
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'fallback_key';
```

3. Add the environment variable to your deployment platform

## Alternative Deployment Options

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Deploy!

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a React app
6. Deploy!

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase login
firebase init hosting
```

3. Build and deploy:
```bash
npm run build
firebase deploy
```

## Environment Variables Setup

### For Production

Create a `.env.production` file:
```
REACT_APP_GEMINI_API_KEY=your_production_api_key
```

### For Development

Create a `.env.development` file:
```
REACT_APP_GEMINI_API_KEY=your_development_api_key
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are installed
2. **API Not Working**: Verify environment variables are set correctly
3. **Styling Issues**: Ensure Tailwind CSS is properly configured
4. **Routing Issues**: For GitHub Pages, you might need to use HashRouter instead of BrowserRouter

### GitHub Pages Routing Fix

If you experience routing issues on GitHub Pages, update your `App.tsx`:

```typescript
import { HashRouter as Router } from 'react-router-dom';
// Instead of: import { BrowserRouter as Router } from 'react-router-dom';
```

## Security Notes

- Never commit API keys to your repository
- Use environment variables for sensitive data
- Consider using a proxy server for API calls in production
- Implement rate limiting for the Gemini API

## Performance Optimization

1. **Code Splitting**: React Router already implements this
2. **Image Optimization**: Use WebP format and lazy loading
3. **Bundle Analysis**: Run `npm run build` and analyze the bundle
4. **Caching**: Implement proper cache headers for static assets 