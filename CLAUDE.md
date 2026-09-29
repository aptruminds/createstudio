# Create Studio — Dev Handoff Notes

## Branch: Vivek
All changes go to Vivek branch only. Never push to main.

## Stack
- Next.js 16 (App Router), TypeScript
- CSS: site-next/app/globals.css
- Components: site-next/components/

## Page Order (page.tsx)
1. Section1Hero
2. Section2Gallery  
3. SectionAbout
4. Section3ServicesGrid
5. Section4Showreel
6. Section3Work (Selected Works carousel)
7. Section8Contact (GREAT BRANDS + orbiting circles)
8. Section7Pricing
9. SectionContactForm
10. SectionFooter

## What's Done ✅
- Navbar: gradient bar on hover, link dimming
- Hero: gradient border button
- Gallery: real images, progress bar, robot
- Showreel: full-bleed video with cover screen
- Selected Works: dark carousel with stars, spark cursor
- Contact (circles): orbiting people images
- Pricing: 4 cards, gradient border CTA
- Contact Form: left blob + right form, searchable country dropdown
- Footer: animated ethereal blob, gradient nav bars, US hover effect

## Pending ❌
1. Section8Contact circles bleeding into Selected Works above — fix overflow
2. About section redesign (check Claude design artifact)
3. Services Grid redesign (check Claude design artifact)  
4. Mobile responsiveness all sections
5. Font/color/gradient consistency

## Claude Design Reference
https://claude.ai/artifact/Ut6KPtQ8Y6JRB6hcmZ7Haj

## Local Dev
- cd ~/Downloads/create/site-next
- Terminal 1: npm run dev → http://localhost:3000
- Terminal 2: git pull origin Vivek (after every push)
- Then Cmd+Shift+R in Chrome

## Key CSS Classes
- Gradient border: .ai-pill (navbar), .cf-submit-wrap (form), .hero-btn-wrap (hero)
- Section snap: scroll-snap-align: start on all sections
- Dark sections: #0a0a0a or #000 or #050505
- Font stack: Syne (UI), Anton (bold headers), Rubik Dirt (footer), Playfair Display (italic)
- Brand gradient: linear-gradient(102deg,#44FF9A,#44B0FF,#8B44FF,#FF6644,#EBFF70)
