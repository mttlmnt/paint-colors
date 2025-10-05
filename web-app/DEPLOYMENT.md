# Deployment to GitHub Pages

This app is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push your code to the `main` branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor the deployment:**
   - Go to the **Actions** tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Once complete, your site will be available at: `https://<username>.github.io/<repository-name>/`

## Manual Deployment

You can also trigger a deployment manually:
- Go to **Actions** tab
- Select the "Deploy to GitHub Pages" workflow
- Click **Run workflow**

## Local Development

The app will run locally at the root path (`/`), but will be deployed with the repository name as the base path on GitHub Pages.

To test the production build locally:
```bash
npm run build
npm run preview
```
