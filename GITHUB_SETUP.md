# Quick GitHub Hosting Guide

## 🚀 Step-by-Step Instructions

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `quiz-master-app` (or any name you prefer)
   - **Description**: `AI-powered quiz application built with React and Gemini AI`
   - **Visibility**: Public or Private (your choice)
   - **Don't** initialize with README (we already have one)
5. Click **"Create repository"**

### 2. Push Your Code

Copy and run these commands in your terminal:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/quiz-master-app.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"gh-pages"** branch and **"/ (root)"** folder
6. Click **"Save"**

### 4. Automatic Deployment

The GitHub Actions workflow will automatically:
- Build your app when you push to main branch
- Deploy to GitHub Pages
- Your app will be available at: `https://YOUR_USERNAME.github.io/quiz-master-app`

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

## 📝 Environment Variables

For the Gemini API to work in production:

1. Create a `.env` file in your project root:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

2. Update `src/services/geminiApi.ts`:
```typescript
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'fallback_key';
```

## 🌐 Your Live App

Once deployed, your app will be available at:
`https://YOUR_USERNAME.github.io/quiz-master-app`

## 📚 Additional Resources

- See `DEPLOYMENT.md` for detailed deployment options
- See `API_SETUP.md` for Gemini API setup
- See `README.md` for app features and usage

## 🆘 Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **Styling issues**: Ensure Tailwind CSS is properly configured
- **API not working**: Verify environment variables are set correctly
- **Routing issues**: The app uses HashRouter which works well with GitHub Pages 