# Railway Deployment Guide

This guide provides detailed instructions for deploying the Crypto Risk Dashboard to Railway.

## Prerequisites

- GitHub account with this repository
- Railway account (sign up at [railway.app](https://railway.app))
- Railway CLI (optional, for local testing)

## Architecture

- **Railway Services**: API, UI, and PostgreSQL database
- **GitHub Actions**: Worker service (runs every 15 minutes)

## Deployment Steps

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project"
3. Select "Empty Project" or "Deploy from GitHub repo"
4. Connect your GitHub repository

### 2. Create PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically provision a PostgreSQL instance
4. Note the service name (e.g., "Postgres")

### 3. Deploy API Service

1. Click "+ New" → "GitHub Repo"
2. Select your repository
3. In the service settings:
   - **Root Directory**: Set to `services/api`
   - **Build Command**: Leave empty (uses Dockerfile)
   - Railway will detect the Dockerfile automatically

4. **Add Environment Variables**:
   - Go to "Variables" tab
   - Click "New Variable"
   - `DATABASE_URL`: Click "Reference Variable" → Select your PostgreSQL service → Select `DATABASE_URL`
   - `SYMBOLS`: Default includes top 30 perp pairs (e.g., `binance:BTC/USDT,...,bybit:APT/USDT`). Override if you want a smaller slice.

5. **Generate Public URL**:
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Note your API URL (e.g., `https://crypto-risk-api-production.up.railway.app`)

### 4. Deploy UI Service

1. Click "+ New" → "GitHub Repo"
2. Select the same repository
3. In the service settings:
   - **Root Directory**: Set to `services/ui`
   - **Build Command**: Leave empty (uses Dockerfile)

4. **Add Environment Variables**:
   - `API_CANDIDATES`: Your API URL from step 3 (e.g., `https://crypto-risk-api-production.up.railway.app,http://api:8000,http://localhost:8000`)
   - `DATABASE_URL`: Reference from PostgreSQL service (same as API service)

5. **Generate Public URL**:
   - Generate a domain for UI service
   - Note your UI URL

### 5. Configure GitHub Actions Worker

The worker runs via GitHub Actions to keep costs low (GitHub Actions free tier).

1. **Get Database Connection String**:
   - In Railway → Your PostgreSQL service → "Variables" tab
   - Copy the `DATABASE_URL` value
   - It should look like: `postgresql://user:password@host:port/dbname`

2. **Add GitHub Secret**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `DATABASE_URL`
   - Value: Paste your Railway PostgreSQL `DATABASE_URL`
   - Click "Add secret"

3. **Verify Workflow**:
   - Go to Actions tab in GitHub
   - The "Crypto Data Worker" workflow should run automatically every 15 minutes
   - You can manually trigger it using "workflow_dispatch"

### 6. Verify Deployment

1. **Check API Health**:
   - Visit your API URL: `https://your-api-url.railway.app/health`
   - Should return: `{"ok": true}`

2. **Check UI**:
   - Visit your UI URL
   - Dashboard should load and show pair selection

3. **Check Worker**:
   - Go to GitHub Actions
   - Check recent runs are successful
   - Wait a few minutes for initial data ingestion

## Environment Variables Reference

### API Service
- `DATABASE_URL`: PostgreSQL connection string (referenced from database service)
- `SYMBOLS`: Comma-separated trading pairs (default top 30, e.g., `binance:BTC/USDT,...,bybit:APT/USDT`)
- `PORT`: Automatically set by Railway (don't set manually)

### UI Service
- `API_CANDIDATES`: Comma-separated API URLs to try (include your Railway API URL)
- `DATABASE_URL`: PostgreSQL connection string (referenced from database service)
- `PORT`: Automatically set by Railway (don't set manually)

### Worker (GitHub Actions)
- `DATABASE_URL`: PostgreSQL connection string (from GitHub Secrets)
- `SYMBOLS`: Trading pairs (set in workflow file; defaults to top 30)
- `SCHEDULE_MINUTES`: Worker schedule interval (set in workflow file)
- `TELEGRAM_BOT_TOKEN`: *(optional)* Telegram bot token for alerting top signals
- `TELEGRAM_CHAT_ID`: *(optional)* Destination chat/channel ID for Telegram notifications
- `SIGNAL_PROFILE`: *(optional)* Default worker profile (`conservative`, `balanced`, or `aggressive`) controlling signal strictness

## Troubleshooting

### API not connecting to database
- Verify `DATABASE_URL` is correctly referenced from PostgreSQL service
- Check PostgreSQL service is running in Railway dashboard
- Ensure database has been initialized (first worker run will do this)

### UI can't find API
- Verify `API_CANDIDATES` includes your Railway API URL
- Check API service is running and health endpoint works
- Ensure API URL is publicly accessible (not internal Railway hostname)

### Worker not running
- Check GitHub Actions workflow is enabled
- Verify `DATABASE_URL` secret is set correctly
- Check workflow logs for errors
- Ensure repository has Actions enabled

### Service not building
- Check Dockerfile exists in service directory
- Verify Root Directory is set correctly (`services/api` or `services/ui`)
- Check build logs in Railway dashboard

## Railway CLI (Optional)

You can also deploy using Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

## Cost Considerations

- **Railway Free Tier**: $5 credit per month
  - Perfect for testing and small deployments
  - May need to upgrade for production traffic
- **GitHub Actions**: Free tier includes 2,000 minutes/month
  - Worker runs every 15 minutes = ~2,880 runs/month
  - Each run takes ~1-2 minutes = ~2,880–5,760 minutes/month
  - May need to optimize or reduce frequency for free tier

## Updating Services

Railway auto-deploys on git push to your main branch. To update:

1. Make changes to your code
2. Commit and push to main branch
3. Railway will automatically rebuild and deploy

You can also manually trigger deployments from Railway dashboard.

