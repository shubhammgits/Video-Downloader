# Deployment Guide for VideoDownloader

This guide explains how to deploy the VideoDownloader application without requiring any subscriptions. You have several options for free deployment.

## Option 1: Vercel (Frontend Only - Free Tier)

Vercel offers a generous free tier that's perfect for hosting the frontend of your application.

### Steps:

1. Sign up at [vercel.com](https://vercel.com) (free account)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Navigate to your project directory:
   ```bash
   cd "C:\Users\shubh\OneDrive\Desktop\video downloader"
   ```
4. Deploy the frontend:
   ```bash
   vercel --prod
   ```

### Notes:
- Vercel's free tier includes 100GB bandwidth/month
- Automatic SSL certificates
- Custom domain support
- Global CDN

## Option 2: Netlify (Frontend Only - Free Tier)

Netlify is another excellent option for static site hosting.

### Steps:

1. Sign up at [netlify.com](https://netlify.com) (free account)
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Deploy the static version:
   ```bash
   # First, build the Next.js app for static export
   npx next build && npx next export
   
   # Then deploy
   netlify deploy --prod
   ```

### Notes:
- 100GB bandwidth/month
- Automatic SSL
- Custom domains
- Continuous deployment from Git

## Option 3: GitHub Pages (Frontend Only - Completely Free)

GitHub Pages is completely free for public repositories.

### Steps:

1. Create a GitHub repository
2. Push your code to GitHub
3. Enable GitHub Pages in repository settings
4. Select the branch to deploy from

### For Static HTML Version:
Simply push the `index.html` and any other static files to GitHub and enable Pages.

### For Next.js Version:
You'll need to export the static files:
```bash
npx next build && npx next export
```
Then push the `out` directory to GitHub.

## Option 4: Self-Hosted on a VPS (Backend + Frontend)

For complete control and no subscription fees, you can self-host on a VPS.

### Recommended Providers (All offer free tiers or very cheap options):
1. **Oracle Cloud** - Always Free Tier (2 VMs, 4GB RAM each)
2. **Google Cloud** - $300 free credit for 90 days
3. **AWS** - 12 months free tier
4. **DigitalOcean** - $200 credit for 60 days

### Steps for Self-Hosting:

1. **Set up the server:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy the backend:**
   ```bash
   # Copy your backend files to the server
   # Navigate to backend directory
   cd /path/to/your/backend
   
   # Install dependencies
   npm install
   
   # Start with PM2
   pm2 start server.js --name "video-downloader-backend"
   ```

3. **Deploy the frontend:**
   ```bash
   # For static HTML version
   # Copy index.html and other static files to /var/www/html
   
   # For Next.js version
   # Build the app
   npx next build
   
   # Start with PM2
   pm2 start npm --name "video-downloader-frontend" -- start
   ```

4. **Set up reverse proxy (optional but recommended):**
   ```bash
   # Install Nginx
   sudo apt install nginx -y
   
   # Configure Nginx (example config)
   sudo nano /etc/nginx/sites-available/default
   ```

   Example Nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;  # Next.js frontend
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /api/ {
           proxy_pass http://localhost:3001;  # Backend API
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

6. **Set up SSL with Let's Encrypt (free):**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get SSL certificate
   sudo certbot --nginx -d yourdomain.com
   ```

## Option 5: Render (Backend - Free Tier)

Render offers a free tier for web services with some limitations.

### Steps:

1. Sign up at [render.com](https://render.com) (free account)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command:
   ```bash
   npm install
   ```
5. Set start command:
   ```bash
   node server.js
   ```
6. Set environment variables if needed

### Notes:
- Free tier includes 500MB RAM
- Sleeps after 15 minutes of inactivity
- 100GB bandwidth/month

## Option 6: Fly.io (Both Frontend and Backend - Free Tier)

Fly.io offers a generous free tier for containerized applications.

### Steps:

1. Install Fly CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Create a fly.toml file in your backend directory:
   ```toml
   app = "your-app-name"
   
   [build]
   builder = "heroku/buildpacks:20"
   
   [env]
   PORT = "8080"
   
   [[services]]
   http_checks = []
   internal_port = 8080
   processes = ["app"]
   protocol = "tcp"
   script_checks = []
   
   [services.concurrency]
   hard_limit = 25
   soft_limit = 20
   type = "connections"
   
   [[services.ports]]
   force_https = true
   handlers = ["http"]
   port = 80
   
   [[services.ports]]
   handlers = ["tls", "http"]
   port = 443
   
   [[services.tcp_checks]]
   grace_period = "1s"
   interval = "15s"
   restart_limit = 0
   timeout = "2s"
   ```

3. Deploy:
   ```bash
   flyctl launch
   ```

## Recommendations

For a completely free solution without any credit card required:

1. **Frontend**: Use GitHub Pages with the static HTML version
2. **Backend**: Use Oracle Cloud's Always Free Tier for self-hosting

For a professional solution with minimal cost:

1. **Frontend**: Vercel (free tier is usually sufficient)
2. **Backend**: DigitalOcean or Oracle Cloud (less than $5/month for a small droplet/instance)

## Important Considerations

### Legal Compliance
- Ensure compliance with the terms of service of video platforms
- Respect copyright laws
- Consider implementing rate limiting to avoid overloading platforms

### Security
- Use HTTPS in production
- Implement proper input validation
- Add authentication if needed for private deployments
- Regularly update dependencies

### Performance
- Consider using a CDN for static assets
- Implement caching strategies
- Monitor resource usage on free tier platforms

This deployment guide provides several options that don't require paid subscriptions, allowing you to make your VideoDownloader application accessible to users worldwide without incurring ongoing costs.