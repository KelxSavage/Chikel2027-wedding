# Chi & Kel Wedding Website

## Files you can edit
- `index.html`: wedding text, event details, navigation, registry link, RSVP form labels, and FAQs.
- `styles.css`: colors, fonts, layout, spacing, and the hero background image.
- `script.js`: mobile menu, gallery slider, and RSVP demo behavior.
- `assets/hero-background.svg`: **hero image placeholder** currently used behind the opening text.
- `assets/gallery-01.svg` through `assets/gallery-10.svg`: **10 gallery image placeholders**.

## Add your hero photo (easy method)
1. Choose a landscape photo for the top of the website.
2. Put it inside the `assets` folder. For example, name it `hero.jpg`.
3. Open `styles.css` and find `.hero` near the top.
4. In the `.hero` background declaration, change:
   `url('assets/hero-background.svg')`
   to:
   `url('assets/hero.jpg')`
5. Save and preview. The dark gradient overlay is already included so the white text remains readable.

You can also replace `assets/hero-background.svg` with your own image file and keep the same filename, but your replacement should be an actual image file. If you use a `.jpg` or `.webp`, make sure the filename in `styles.css` matches.

## Add the 10 gallery photos
Put your images in `assets`, for example `gallery-01.jpg` through `gallery-10.jpg`. In `index.html`, find each image path `assets/gallery-01.svg` and change it to the matching file name, such as `assets/gallery-01.jpg`. Repeat for slots 02 through 10. Keep the names and extensions in HTML identical to the actual files.

## Customize the wedding details
Open `index.html` in a text editor or Replit and search for the current text:
- `CHIDINMA` / `KELECHI`
- `MAY 29, 2027`
- `Chateau St. Cyr`
- ceremony and celebration times
- accommodation copy and registry link
- `hello@example.com` (replace with your real contact email)

## Preview in Replit
Upload the files and preserve this structure:
- `index.html`
- `styles.css`
- `script.js`
- `assets/` (with the hero and gallery files inside)

This is a static HTML/CSS/JavaScript site. The RSVP form is currently a front-end demo and does not save submissions until connected to a form service or database.
