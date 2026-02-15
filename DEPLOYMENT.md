# Deployment Guide for stacksmith

This guide will help you deploy stacksmith to various platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (if needed)
   - Click "Deploy"

3. **Environment Variables** (Optional)
   Add these in Vercel dashboard under Settings → Environment Variables:
   - \`OPENAI_API_KEY\` - Your OpenAI API key (for AI features)
   - \`X402_ENABLED\` - Set to \`true\` to enable payment features
   - \`USDCX_CONTRACT_ADDRESS\` - USDCx contract address

## Netlify

1. **Build Command**: \`npm run build\`
2. **Publish Directory**: \`.next\`
3. Add environment variables in Netlify dashboard

## Self-Hosting

### Using Node.js

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

3. The app will be available at \`http://localhost:3000\`

### Using Docker

1. Create a \`Dockerfile\`:
   \`\`\`dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   # Build app
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   # Production image
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   \`\`\`

2. Build and run:
   \`\`\`bash
   docker build -t stacksmith .
   docker run -p 3000:3000 stacksmith
   \`\`\`

## Environment Configuration

Create a \`.env.local\` file based on \`.env.example\`:

\`\`\`env
OPENAI_API_KEY=your_api_key_here
X402_ENABLED=false
USDCX_CONTRACT_ADDRESS=
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test AI analysis functionality
- [ ] Check mobile responsiveness
- [ ] Test image upload feature
- [ ] Verify pattern library displays correctly
- [ ] Check SEO meta tags
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (if desired)

## Performance Optimization

1. **Enable Caching**
   - Configure CDN caching for static assets
   - Use Vercel's Edge Network for automatic optimization

2. **Image Optimization**
   - Images are automatically optimized by Next.js
   - Consider using Vercel's Image Optimization

3. **Analytics**
   - Add Vercel Analytics for performance monitoring
   - Configure Google Analytics if needed

## Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor API usage and costs
- Track user analytics
- Set up uptime monitoring

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Ensure all dependencies are installed
- Verify environment variables are set

### API Errors
- Check API key configuration
- Verify network connectivity
- Review API usage limits

### Performance Issues
- Enable caching
- Optimize images
- Use CDN for static assets
- Consider server-side rendering optimization

For more help, refer to:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
