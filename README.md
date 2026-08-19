# Jahid Hasan Milon — Portfolio

Multi-page static portfolio site (HTML + CSS + vanilla JS), পরে WordPress-এ Custom HTML block হিসেবে প্রতিটা page আলাদা করে বসানোর জন্য বানানো।

## ফোল্ডার স্ট্রাকচার

```
jahid-portfolio/
├── index.html          ← Home (Hero) + About Me
├── contact.html        ← Contact page
├── rubalif.html        ← Rubalif project page
├── visatrack.html       ← VisaTrack project page
├── css/
│   ├── navbar.css      ← সব page-এ common: navbar, hamburger, global reset (box-sizing, overflow-x)
│   ├── hero.css        ← Home section (WEB DEV Portfolio)
│   ├── about.css       ← About Me section
│   ├── contact.css     ← Contact page
│   └── projects.css    ← Rubalif + VisaTrack (shared styles)
├── js/
│   ├── navbar.js       ← সব page-এ common: hamburger + submenu logic
│   └── hero.js         ← শুধু index.html-এ: WEB DEV text scale animation
├── images/             ← site-এর নিজস্ব photo/logo (আর WordPress-এর উপর নির্ভর করে না)
│   ├── jahid-hasan-milon.jpg
│   └── rubalif-logo.png
└── README.md
```

## Pages

| Page | File | Section ID(s) | CSS | JS |
|---|---|---|---|---|
| Home + About Me | `index.html` | `#home`, `#about` | navbar.css, hero.css, about.css | navbar.js, hero.js |
| Contact | `contact.html` | `#contact` | navbar.css, contact.css | navbar.js |
| Rubalif | `rubalif.html` | `#rubalif` | navbar.css, projects.css | navbar.js |
| VisaTrack | `visatrack.html` | `#visatrack` | navbar.css, projects.css | navbar.js |

প্রতিটা page-এ নিজের navbar markup আছে (WordPress-এ প্রতি page-এ যেভাবে আলাদা Custom HTML block হিসেবে menu বসে, ঠিক সেভাবেই)।

## Navigation

Menu bar সব page-এ same:

- **Home** → `index.html` (local) — WordPress-এ `https://jahidhasanmilon.com/`
- **Work** → submenu (Web Design, Branding) — শুধু anchor, page বানানো হয়নি
- **Projects** → submenu:
  - Rubalif → `rubalif.html` (local)
  - Admin Dashboard (CMS) → `rubalif.html` (একই URL, duplicate — intentional রাখা হয়েছে)
  - Trackly → এখনো বানানো হয়নি, external URL রাখা আছে
  - VisaTrack → `visatrack.html` (local)
- **Services** → এখনো বানানো হয়নি, external URL
- **Content Creation** → এখনো বানানো হয়নি, external URL
- **Contact** → `contact.html` (local)

> ⚠️ **WordPress-এ deploy করার আগে:** Home/Contact/Rubalif/VisaTrack-এর href local file name (`index.html`, `contact.html` ইত্যাদি) থেকে বদলে আবার production URL (`https://jahidhasanmilon.com/...`) বসাতে হবে।

## Local এ preview করতে

```
npx serve .
```
তারপর browser-এ `http://localhost:3000` (বা যে port দেখায়) খুলো।

## Photo Replace করতে

Photo গুলো এখন `images/` ফোল্ডারে local ভাবে রাখা (আগে WordPress-এর `wp-content/uploads` থেকে load হতো — domain Vercel-এ move করলে সেই path আর কাজ করতো না বলে এখানে সরিয়ে আনা হয়েছে)। নতুন photo বসাতে `images/` ফোল্ডারে file রেখে HTML-এর `<img src="images/...">` path আপডেট করো।

## WordPress এ Add করতে

প্রতিটা page (`index.html`, `contact.html`, `rubalif.html`, `visatrack.html`) আলাদা WordPress Page-এর **Custom HTML block** হিসেবে যোগ করো। `<style>` অংশ (css/ ফোল্ডারের content) Additional CSS বা child theme-এ, আর `<script>` অংশ (js/ ফোল্ডারের content) footer script হিসেবে বসাও।

## Design Notes

- Global reset (box-sizing, overflow-x hidden, navbar-height offset) সব page-এ `css/navbar.css`-এ centralized।
- সব section-এর container একটা consistent `max-width` (1100–1300px) দিয়ে center করা, যাতে wide screen-এ content ছড়িয়ে না যায়।
- Rubalif আর VisaTrack `css/projects.css`-এর একই class শেয়ার করে; hover color আর logo শুধু `#visatrack` scope দিয়ে আলাদা করা আছে, যাতে একটার style অন্যটাকে overwrite না করে।
