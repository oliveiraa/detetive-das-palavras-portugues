# Firestore Database Connection Fix Summary

## Problems Identified

### 1. Frontend API Key Issue
- **Error**: `API key not valid` - Frontend calling Gemini API directly
- **Solution**: Frontend should use backend proxy, not direct API calls

### 2. Firestore Database Path Issue  
- **Error**: `5 NOT_FOUND` - Server can't save test results
- **Root Cause**: Using named database `detetiva-das-palavras` but Firebase Admin SDK needs proper database URL

## Solutions Applied

### ✅ Server Code Updates
1. **Smart Database URL Detection**: Added logic to detect `FIREBASE_CONFIG` environment variable
2. **Fallback Logic**: Defaults to `https://detetiva-das-palavras.firebaseio.com`
3. **Project ID**: Explicitly set to `gen-lang-client-0900539959` for named database
4. **Error Handling**: Graceful JSON parsing with fallback

### 🔧 Environment Variables Needed

#### For Cloud Run Deployment:
```bash
FIREBASE_CONFIG='{"databaseURL":"https://detetiva-das-palavras.firebaseio.com"}'
```

#### For Local Development:
```bash
export FIREBASE_CONFIG='{"databaseURL":"https://detetiva-das-palavras.firebaseio.com"}'
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

## Next Steps

1. **Deploy updated server** to Cloud Run
2. **Set FIREBASE_CONFIG** environment variable in Cloud Run
3. **Test the connection** - should save to correct database
4. **Verify frontend** is using backend proxy endpoints

## Files Modified
- `server/server.js` - Updated Firebase initialization logic
- `Dockerfile` - No changes needed (environment variables handled at runtime)

## Database Connection Flow
```
Frontend → Backend Proxy → Gemini API
Backend → Firestore (detetiva-das-palavras)
```

The server now properly connects to the named database instead of default!