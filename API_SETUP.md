# Setting Up Gemini API Key

## Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Update the API Key

1. Open `src/services/geminiApi.ts`
2. Replace the `API_KEY` constant with your actual key:

```typescript
const API_KEY = 'your-actual-api-key-here';
```

## Test the Integration

1. Restart the development server: `npm start`
2. Try creating a quiz with any topic
3. The app will now use the real Gemini AI to generate questions

## Fallback Mode

If the API key is not configured or there are any issues, the app will automatically use fallback questions to ensure it always works for testing purposes.

## Troubleshooting

- **Invalid API Key**: Make sure you copied the entire key correctly
- **Rate Limits**: The free tier has usage limits
- **Network Issues**: Check your internet connection
- **API Errors**: Check the browser console for detailed error messages 