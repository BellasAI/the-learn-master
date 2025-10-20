# Quick Deploy Guide

## 🚀 Deploy in 3 Minutes with Auto-Updates

Your code is on GitHub: **https://github.com/BellasAI/the-learn-master**

### Option 1: Vercel (Recommended - Auto-Deploy)

1. **Go to:** https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** the repository: `BellasAI/the-learn-master`
4. **Click "Deploy"** (no configuration needed!)
5. ✅ **Done!** Your site is live

**Every GitHub push will auto-deploy!**

---

### Option 2: Netlify (Alternative - Also Auto-Deploy)

1. **Go to:** https://app.netlify.com/start
2. **Sign in** with GitHub
3. **Select** repository: `BellasAI/the-learn-master`
4. Build settings (auto-detected):
   - Build command: `pnpm run build`
   - Publish directory: `dist`
5. **Click "Deploy"**
6. ✅ **Done!**

**Every GitHub push will auto-deploy!**

---

## 🔐 Add Stripe Keys (After Deployment)

1. Go to your deployment dashboard (Vercel or Netlify)
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - Name: `VITE_STRIPE_PUBLIC_KEY`
   - Value: Your Stripe publishable key
4. **Redeploy** for changes to take effect

---

## 📝 Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

---

## 🔄 Deploy Updates

```bash
# Make changes, then:
git add .
git commit -m "Your update description"
git push

# That's it! Auto-deploys in ~2 minutes
```

---

**Full guide:** See `DEPLOYMENT_GUIDE.md` for detailed instructions

