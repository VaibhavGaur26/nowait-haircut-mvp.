# NoWait Cuts — MVP Website + Booking

This is a **no-code friendly MVP** for a "no-wait haircut" startup.
It uses **static pages** + **Google Forms** + **WhatsApp deep links**.

## What’s inside
- Static site: `index.html`, `shops.html`, `book.html`, `success.html`
- Config: `assets/js/config.js`
- Sample data: `assets/data/shops.json`
- Minimal styles: `assets/css/style.css`
- Simple logo: `assets/img/logo.svg`
- Google Apps Script (token assignment): `apps_script/TokenAssign.gs`
- Google Apps Script (create the Form): `apps_script/CreateForm.gs`

## Quick start (10 minutes)
1. **Host the site for free**
   - Create a GitHub repo named `nowait-haircut-mvp`.
   - Upload all files.
   - Enable **GitHub Pages** → Branch: `main`, Folder: `/root`.
   - Your site will be at `https://<your-username>.github.io/nowait-haircut-mvp`.
2. **Create the booking Google Form** (automated)
   - Open **script.google.com** → New project.
   - Paste `apps_script/CreateForm.gs` → Run `createBookingForm()`.
   - Copy the public Form URL shown in the logs.
3. **Connect token assignment**
   - In the same Apps Script project, paste `apps_script/TokenAssign.gs`.
   - In the Google Form → Responses → **Link to Sheets**.
   - In Apps Script → Triggers (clock icon) → Add Trigger for `onFormSubmit` → Event type: **From spreadsheet** on form submit.
4. **Update your website config**
   - Edit `assets/js/config.js`:
     - `WHATSAPP_NUMBER`
     - `SITE_DOMAIN` (your Pages URL)
     - `FORM_URL` (your Google Form public URL)
   - Optional: Create **pre-filled links per shop** in Form (More → Get pre-filled link). Put them into `SHOP_PREFILL`.
5. **Add your real shops**
   - Edit `assets/data/shops.json` with actual names, addresses, prices, and WhatsApp numbers.
6. **Create QR codes (optional)**
   - Link format for shop-specific booking: `https://<your-pages-domain>/book.html?shop=<shop-id>`
   - Use any free QR tool to generate and print (e.g., on your phone or desktop).

## Notes
- WhatsApp **auto-sending** requires the official Business API (paid). This MVP uses clickable deep-links only.
- Token numbers are assigned server-side via **Apps Script** when a form response arrives.
- For languages, you can duplicate pages and translate labels as needed.

## Safety & privacy
- Store minimal PII (name, phone, shop, service, arrival time).
- Do not store card/UPI numbers. Payments happen in-shop.

## Next steps
- Add delayed credit wallet, live ETA, and UPI deposit via providers like Razorpay when you scale.
