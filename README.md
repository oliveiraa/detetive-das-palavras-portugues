# AI Studio Gemini App Proxy Server

This nodejs proxy server lets you run your AI Studio Gemini application unmodified, without exposing your API key in the frontend code.


## Instructions

**Prerequisites**:
- [Google Cloud SDK / gcloud CLI](https://cloud.google.com/sdk/docs/install)
- (Optional) Gemini API Key

1. Download or copy the files of your AI Studio app into this directory at the root level.
2. If your app calls the Gemini API, create a Secret for your API key:
     ```
     echo -n "${GEMINI_API_KEY}" | gcloud secrets create gemini_api_key --data-file=-
     ```

3.  Deploy to Cloud Run (optionally including API key):
    ```
    gcloud run deploy my-app --source=. --update-secrets=GEMINI_API_KEY=gemini_api_key:latest
    ```

## Firestore Integration

This app now includes Firestore integration to save test results. The integration uses the default Cloud Run service account for authentication, so no additional setup is required for credentials when deployed.

### Enabling Firestore

1. Enable the Firestore API in your GCP project:
   ```
   gcloud services enable firestore.googleapis.com
   ```

2. Create a Firestore database in the Firebase Console or using gcloud:
   ```
   gcloud firestore databases create --database-type=firestore-native --location=us-east1
   ```

3. The app will automatically save test results to a collection called `testResults` in Firestore.

### Local Development with Firestore

For local development, you may need to set up authentication:
```
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
```

The test results will be saved with the following structure:
- Collection: `testResults`
- Documents: Each test submission with all answer fields and AI feedback
