# Deployment Guide

This guide covers deploying the Incident Management Quiz to various platforms, with Vercel being the recommended and officially supported deployment target.

## 🚀 Quick Deploy

### Vercel (Recommended)

The fastest way to deploy is using the one-click Vercel button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftwentworth12%2Fim-quiz)

This will:
1. Fork the repository to your GitHub account
2. Create a new Vercel project
3. Deploy automatically with optimal settings
4. Set up automatic deployments for future commits

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.17 or later
- **npm**: 9.0 or later (comes with Node.js)
- **Git**: 2.30 or later

### Account Requirements
- **GitHub Account**: For repository hosting
- **Vercel Account**: For deployment (free tier available)
- **Domain** (optional): For custom domain configuration

## 🔧 Vercel Deployment (Detailed)

### Step 1: Repository Setup

1. **Fork the repository** (if you haven't already):
   ```bash
   # Or clone if you have access
   git clone https://github.com/twentworth12/im-quiz.git
   cd im-quiz
   ```

2. **Push to your own repository**:
   ```bash
   # If cloning, create your own repo and push
   git remote set-url origin https://github.com/YOUR_USERNAME/im-quiz.git
   git push -u origin main
   ```

### Step 2: Vercel Project Setup

1. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/in with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Configure deployment settings**:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Development Command: npm run dev
   ```

### Step 3: Environment Variables

Set up environment variables in Vercel dashboard:

#### Required Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app

# Optional: Database (if you implement persistent storage)
DATABASE_URL=your_database_connection_string

# Optional: Email service (for notifications)
EMAIL_API_KEY=your_email_service_api_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Optional: CRM Integration
CRM_API_KEY=your_crm_api_key
CRM_WEBHOOK_URL=your_crm_webhook_url

# Optional: Analytics
ANALYTICS_API_KEY=your_analytics_key
```

#### Setting Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope:
   - **Production**: Live site variables
   - **Preview**: Staging/preview deployments
   - **Development**: Local development (optional)

### Step 4: Custom Domain (Optional)

1. **Add domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   ```
   Type: CNAME
   Name: quiz (or your subdomain)
   Value: cname.vercel-dns.com
   ```

   Or for apex domain:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Step 5: Deployment Verification

1. **Check build logs** in Vercel dashboard
2. **Test the deployed application**:
   - Lead form submission
   - Quiz functionality
   - Results display
   - SWAG link functionality

3. **Monitor performance**:
   - Use Vercel Analytics
   - Check Core Web Vitals
   - Monitor error rates

## 🐳 Docker Deployment

For self-hosted deployments, use Docker:

### Dockerfile

```dockerfile
# Production Dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  quiz-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - quiz-app
    restart: unless-stopped
```

### Build and Deploy

```bash
# Build the Docker image
docker build -t im-quiz .

# Run the container
docker run -p 3000:3000 -e NODE_ENV=production im-quiz

# Or use Docker Compose
docker-compose up -d
```

## ☁️ AWS Deployment

### Using AWS Amplify

1. **Connect repository**:
   - Go to AWS Amplify Console
   - Choose "Host web app"
   - Connect GitHub repository

2. **Build settings**:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: .next
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
   ```

3. **Environment variables**:
   - Add environment variables in Amplify console
   - Same variables as Vercel deployment

### Using EC2 + Load Balancer

1. **EC2 Instance Setup**:
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   sudo npm install pm2 -g

   # Clone and setup application
   git clone https://github.com/YOUR_USERNAME/im-quiz.git
   cd im-quiz
   npm ci --production
   npm run build
   
   # Start with PM2
   pm2 start npm --name "im-quiz" -- start
   pm2 startup
   pm2 save
   ```

2. **Load Balancer Configuration**:
   - Create Application Load Balancer
   - Configure target groups
   - Set up health checks on `/api/health` (if implemented)

## 🌐 CDN Configuration

### Vercel CDN (Automatic)

Vercel automatically configures CDN for optimal performance:
- Global edge network
- Automatic image optimization
- Static asset caching
- Dynamic content caching

### CloudFlare Integration

1. **Add site to CloudFlare**:
   - Point your domain to CloudFlare nameservers
   - Configure proxy settings

2. **Optimization settings**:
   ```
   Auto Minify: HTML, CSS, JS
   Brotli Compression: Enabled
   Browser Cache TTL: 4 hours
   Edge Cache TTL: 2 hours
   ```

3. **Page Rules**:
   ```
   *quiz.yourdomain.com/api/*
   - Cache Level: Bypass
   
   *quiz.yourdomain.com/_next/static/*
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   
   *quiz.yourdomain.com/*
   - Cache Level: Standard
   - Browser Cache TTL: 4 hours
   ```

## 📊 Monitoring Setup

### Vercel Analytics

Automatically enabled for Vercel deployments:
- Core Web Vitals tracking
- Page view analytics
- Performance monitoring
- Error tracking

### Custom Monitoring

#### Sentry Integration

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

#### Google Analytics

```javascript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

### Health Checks

Implement health check endpoint:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
}
```

## 🔒 Security Configuration

### Security Headers

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Content Security Policy

```javascript
// next.config.js CSP configuration
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app;
  child-src *.vercel.app;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;
```

## 🚦 Environment Management

### Development Environment

```bash
# Local development
npm run dev

# Local production build test
npm run build
npm run start
```

### Staging Environment

Set up staging branch deployment:

1. **Create staging branch**:
   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

2. **Vercel staging setup**:
   - Connect staging branch to preview deployments
   - Use different environment variables
   - Test integrations in staging

### Production Environment

Production deployment checklist:

- [ ] Environment variables configured
- [ ] Custom domain set up
- [ ] SSL certificate active
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Backup strategy in place

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Lint
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-args: '--prod'
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}
```

## 📈 Performance Optimization

### Build Optimization

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"scripts": {
  "analyze": "ANALYZE=true npm run build"
}

# Run analysis
npm run analyze
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Environment Variable Issues

1. Check variable names (case-sensitive)
2. Verify NEXT_PUBLIC_ prefix for client-side variables
3. Restart development server after changes

### Debugging Production Issues

1. **Check Vercel function logs**:
   - Go to Vercel dashboard
   - View function logs for API routes
   - Check for runtime errors

2. **Enable debug mode**:
   ```env
   DEBUG=1
   NEXT_DEBUG=1
   ```

3. **Monitor performance**:
   - Use Vercel Analytics
   - Check Core Web Vitals
   - Monitor API response times

### Rollback Strategy

```bash
# Using Vercel CLI
vercel rollback [deployment-url]

# Or redeploy previous commit
git revert HEAD
git push origin main
```

## 📞 Support

For deployment issues:

1. **Check documentation**: Review this guide and Next.js docs
2. **Search issues**: Check GitHub issues for similar problems
3. **Create issue**: Open a new issue with deployment details
4. **Community help**: Ask in GitHub Discussions

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] Test complete user flow (lead → quiz → results)
- [ ] Verify swag store link functionality
- [ ] Check mobile responsiveness
- [ ] Test performance with Lighthouse
- [ ] Monitor error rates for 24 hours
- [ ] Set up monitoring alerts
- [ ] Document custom configurations
- [ ] Share with team for testing

This deployment guide ensures your Incident Management Quiz is deployed securely, performantly, and reliably across various platforms.