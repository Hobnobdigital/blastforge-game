# Cookie Challenge - Deployment Guide

This document provides instructions for deploying the Cookie Challenge HTML5 game to Vercel.

## 📁 Project Structure

```
cookie-challenge/
├── index.html          # Main game file (entry point)
├── vercel.json         # Vercel configuration
├── deploy.sh           # Deployment script
├── assets/
│   ├── sounds/         # Audio files (.mp3, .wav, .ogg)
│   └── sprites/        # Image assets (.png, .jpg, .svg)
├── game.js             # Game logic (if separate)
└── style.css           # Styles (if separate)
```

## 🚀 Quick Deploy

### Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Logged in to Vercel: `vercel login`
- Game code ready in `index.html`

### Deploy to Preview (Recommended for Testing)
```bash
cd cookie-challenge
./deploy.sh preview
# or simply:
vercel
```

### Deploy to Production
```bash
cd cookie-challenge
./deploy.sh production
# or:
vercel --prod
```

## ⚙️ Configuration Details

### vercel.json Settings

| Setting | Value | Description |
|---------|-------|-------------|
| `name` | `cookie-challenge` | Project name on Vercel |
| `framework` | `null` | Static site (no build) |
| `buildCommand` | `null` | No build step required |
| `outputDirectory` | `.` | Root directory is output |

### Cache Headers

Assets are cached for optimal performance:

| File Type | Cache Duration | Pattern |
|-----------|----------------|---------|
| Audio files | 1 year | `*.mp3`, `*.wav`, `*.ogg` |
| Images | 1 year | `*.png`, `*.jpg`, `*.svg`, `*.webp` |
| JS/CSS | 1 day | `*.js`, `*.css` |

## 🔧 Manual Deployment Steps

If you prefer not to use the deploy script:

1. **Navigate to project directory:**
   ```bash
   cd cookie-challenge
   ```

2. **Link to Vercel project (first time only):**
   ```bash
   vercel link
   # Select "cookie-challenge" or create new project
   ```

3. **Deploy preview:**
   ```bash
   vercel
   ```

4. **Deploy production:**
   ```bash
   vercel --prod
   ```

## 🌐 Environment Variables

If your game needs environment variables (e.g., for analytics):

```bash
vercel env add ANALYTICS_ID
```

Or add them in the Vercel Dashboard: Project Settings → Environment Variables

## 📊 Monitoring & Analytics

View deployment analytics:
- Dashboard: https://vercel.com/dashboard
- Project: https://vercel.com/hobnobdigital/cookie-challenge

## 🔄 Continuous Deployment

### GitHub Integration (Recommended)

1. Push code to GitHub
2. Connect repo in Vercel Dashboard
3. Auto-deploy on every push

### Manual CI/CD

Add to your GitHub Actions workflow:
```yaml
- name: Deploy to Vercel
  run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `Command not found: vercel` | Install CLI: `npm i -g vercel` |
| `Not authorized` | Run `vercel login` first |
| `No index.html found` | Ensure game code is in the directory |
| Assets not loading | Check paths are relative (e.g., `./assets/sounds/`) |
| Old assets showing | Hard refresh: `Ctrl+Shift+R` or clear cache |

### Cache Busting

For immediate asset updates, add version query:
```html
<script src="game.js?v=2"></script>
```

## 📝 Deployment Checklist

Before deploying to production:

- [ ] Game runs locally without errors
- [ ] All assets load correctly
- [ ] Audio plays on user interaction
- [ ] Responsive design works on mobile
- [ ] No console errors in browser dev tools

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- CLI Help: `vercel --help`
- Project Dashboard: https://vercel.com/dashboard

---

**Project:** cookie-challenge  
**Framework:** Static HTML5  
**Deployed via:** Vercel CLI
