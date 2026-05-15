# MyStuff — Amazon Appstore Publishing Guide

## Cost: FREE
Amazon charges nothing to register or publish. No annual fee either.

---

## Your project files

```
mystuff-amazon/
├── index.html              ← Your app
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service worker
├── icons/
│   ├── icon-114.png        ← Amazon small icon (required)
│   ├── icon-512.png        ← Amazon large icon (required)
│   ├── icon-192.png        ← PWA icon
│   ├── feature-graphic.png ← 1024x500 banner (required by Amazon)
│   └── ... (other sizes)
└── README.md               ← This file
```

---

## Step 1 — Host your app on GitHub Pages

Same as Google Play. If you already did this for Google Play, skip to Step 2.

1. Go to **github.com** → sign in or create a free account
2. Click **+** → **New repository** → name it `mystuff` → Public
3. Check "Add a README file" → Create repository
4. Click **Add file** → **Upload files**
5. Upload everything: `index.html`, `manifest.json`, `sw.js`, and all files in `icons/`
6. Go to **Settings** → **Pages** → Source: **main branch** → Save
7. Your URL: `https://YOUR-USERNAME.github.io/mystuff`

> Wait 2-3 minutes, then open that URL in Chrome on your phone to confirm it works.

---

## Step 2 — Build your Android APK with PWABuilder

Amazon accepts the exact same APK format as Google Play.

1. Go to **pwabuilder.com** on your computer
2. Paste your GitHub Pages URL → hit Enter
3. Click **Package for Stores** → **Android**
4. Fill in:
   - **Package ID**: `com.yourname.mystuff` (e.g. `com.rachel.mystuff`)
     - Must be unique — if you already submitted to Google Play, use the same ID
   - **App version**: `1`
   - **App version string**: `1.0.0`
5. Click **Generate** → download the zip

---

## Step 3 — Sign your APK

Amazon requires a signed APK, same as Google Play.

**Install Java JDK** if you haven't yet:
- Download from **adoptium.net** → LTS version for your OS → install it

**Generate a signing key** (do this once, keep the file forever):
```bash
keytool -genkey -v \
  -keystore mystuff-key.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias mystuff
```
It will ask for a password and some info (your name, city, etc.).
**Write down your password and keep mystuff-key.jks somewhere safe.**
If you lose this file, you can never update the app.

**Sign the APK:**

The PWABuilder zip contains detailed signing instructions.
Follow those — they're kept current and handle edge cases.

Your final file will be something like `app-release-signed.apk`.

---

## Step 4 — Create your Amazon Developer account

1. Go to **developer.amazon.com**
2. Click **Sign In** — use your regular Amazon account (or create one free)
3. Click **Sign up** under Developer Console — it's free, no credit card needed
4. Accept the developer agreement

---

## Step 5 — Submit your app

1. Go to **developer.amazon.com/apps-and-games**
2. Click **Add a New App** → **Android**
3. Fill in the **General Information** tab:
   - App title: `MyStuff`
   - App SKU: `mystuff-001` (anything unique)
   - Category: **Utilities**
   - Sub-category: **Productivity**

4. **Availability & Pricing** tab:
   - Price: **Free**
   - Select your countries (you can choose "All countries")

5. **Description** tab — fill in:
   - Short description (150 chars max):
     ```
     Track your belongings at home. Check items in and out, see who has what, and never lose track of your stuff.
     ```
   - Long description:
     ```
     MyStuff is a simple home inventory tracker. Add your belongings with photos and descriptions, then check them out when someone borrows them — including who took it, what they're using it for, and where they're taking it.

     Features:
     • Track items by room and location
     • Check items in and out — name required to borrow
     • QR code per item — stick it on your stuff and scan to look up instantly
     • Location QR codes — label shelves, drawers, and toolboxes like a warehouse
     • Report broken or used-up items
     • Activity log for every item
     • Works offline
     • Free, no account needed, data stays on your device
     ```

6. **Images & Multimedia** tab — required uploads:
   - **Small icon** (114x114): use `icons/icon-114.png`
   - **Large icon** (512x512): use `icons/icon-512.png`
   - **Screenshots**: At least 3 screenshots of your app running
     - Take them on your phone: open the app, take screenshots of the main screen, the scan screen, and the missing items screen
     - Minimum size: 800x480 or 1280x800
   - **Promotional image** (1024x500): use `icons/feature-graphic.png`

7. **Content Rating** tab:
   - Click **Launch Content Rating Questionnaire**
   - Answer the questions (this app has no violence, ads, purchases, etc.)
   - You'll get a rating — probably "Everyone"

8. **Binary File** tab:
   - Click **Upload your APK**
   - Upload your signed APK file
   - Amazon will scan it automatically (takes a few minutes)
   - If it passes, you'll see a green checkmark

9. Click **Save** then **Submit App**

---

## How long does review take?

Amazon typically reviews apps in **1-3 business days**.
You'll get an email when it's approved or if they need changes.

---

## Updating the app later

1. Make your changes to `index.html`
2. Re-upload to GitHub (the live site updates automatically)
3. For a new APK version, bump the version number in PWABuilder to `2`, re-sign, re-upload to Amazon
4. Amazon re-reviews updates, usually faster than the first submission (~1 day)

---

## Difference vs Google Play

| | Amazon Appstore | Google Play |
|---|---|---|
| Cost | **Free** | $25 one-time |
| Audience | Smaller (Fire tablets, some Android) | Much larger |
| Review time | 1-3 days | 1-3 days |
| APK format | Same | Same |
| Signing | Same process | Same process |

You can publish to both stores with the same signed APK.
Just use the same Package ID on both.

---

## Troubleshooting

**"APK not compatible"** — Make sure you used PWABuilder's Android output,
not the iOS or Windows package.

**"Package ID already taken"** — Change your package ID slightly,
e.g. `com.rachel.mystuffapp` instead of `com.rachel.mystuff`

**Screenshots rejected** — They need to show the actual app UI.
Take them on a real Android phone, not a desktop browser.

**PWABuilder scan fails** — Visit your GitHub Pages URL directly first.
Make sure `manifest.json` loads at `your-url/manifest.json`
and `sw.js` loads at `your-url/sw.js`.
