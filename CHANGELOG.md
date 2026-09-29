# Changelog

## 2026-07-24
- About parallax images + Showreel tablet frame (tab.png): switched from `loading="lazy"` to `loading="eager"` — the page scrolls inside `.snap-container`, so native lazy-load (which measures against the document viewport that never scrolls) often never fired, leaving these images blank on fresh/uncached sessions for many users

## 2026-07-08 (later 2)
- Showreel: screen geometry corrected to tab.png's actual transparent cutout (alpha-measured: top 5.69%, height 88.95%, aspect 1.60:1) — the old box overshot ~5.4% under the opaque bottom bezel, which is why controls placed there showed as a detached black bar or disappeared entirely; tablet centering offset recomputed so the video is dead-center in the viewport
- Showreel: video plays in an exact 16:9 stage centered in the cutout — no side crop, no letterbox asymmetry, thin symmetric black bands read as the tablet's own screen
- Showreel: controls collapsed to one slim row on the video's bottom edge — play/pause, stretching seek bar, timestamp + mute on the right; center overlay and ±10s skip buttons removed
- Showreel: explicit layer order — tab frame on top (z4), then bloom (z3), controls (z2), video (z1); the frame bezel masks the screen contents and stays click-through
- Showreel: controls start their fade-out countdown on load instead of lingering until the first mouse move

## 2026-07-08 (later)
- Showreel: YouTube-style controls on the tablet screen — play/pause, ±10s skips, red seek bar (click/drag to scrub, rAF-smooth progress), time readout, and mute in the bar; replaces the center play button and floating sound toggle. Controls fade out after ~2.4s of playback and wake on mouse move; clicking the video toggles play.
- Showreel: video is now what's centered in the viewport — the tab.png screen cutout sits 2.63% low in the frame (5.31% top bezel, ~0% bottom), so the tablet unit rides up by that bias (%-translate keeps it exact through the zoom intro)

## 2026-07-08
- Navbar: dark frosted-glass bar over the work archive removed — the nav stays transparent there like every other section, with the section background running full behind it
- CTAs: "Get in Touch" and "Book a Consultation" pills share a 240px min-width so both buttons are the same size (height and text size already matched)

## 2026-07-07 (night 3)
- About → Services: dip-to-black overlay removed — it showed as a dead black screen between the sections (a full viewport scrolling down, and unavoidably when scrolling back up, since you re-enter the section at its fully-dipped bottom); the dark services grid scrolling in over the collage is the transition now
- About collage: `background-size: cover` on phones — width-% sizing of the landscape image left white bands above/below on portrait screens (previously hidden by the dip)
- Mobile snap assist: glide is a cancellable rAF tween instead of native smooth scroll (touching mid-glide no longer fights the finger), the fixed 700ms settling window that silently swallowed follow-up swipes is gone, `touchcancel` is handled, and the snap range widened to half the viewport so a rest straddling a section boundary always settles to the majority side
- Showreel: new Create Studio showreel video; `object-fit: contain` in the tablet screen (16:9 video in a ~1.51:1 cutout was getting its sides cropped)
- Showreel mobile: reels-style fullscreen portrait video — no tablet frame, no zoom intro, tap to pause, scroll straight to the next section
- Mobile menu: links and Contact Us pill center-aligned
- Pricing: "Get in Touch" CTA content-sized and centered on mobile (the section's `align-items: stretch` for the cards was stretching it full-width), matching "Book a Consultation"

## 2026-07-07 (night 2)
- Services grid: each tile got a poster jpg (frame pulled from its video) so idle tiles stay visual on phones, where the video src is detached until a tap
- Mobile snapping rebuilt in JS (MobileSnapAssist): CSS `mandatory` yanked to the next section as soon as a tall section's bottom edge appeared (last services tile unreachable, work archive entered from the top when scrolling back up from pricing). Now CSS snap is off on phones and a settled swipe glides to a section top only when one is within 40% of the viewport — the interior of tall sections scrolls freely in both directions.

## 2026-07-07 (night)
- iOS Safari crash fix ("A problem repeatedly occurred" = tab out of memory): EtherealShadow's animated 5-step SVG displacement filter (2 instances, CPU-rasterized over an oversized region) replaced with a plain blur on phones, and its rAF loop skipped there
- iOS Safari crash fix: service-grid videos on touch devices only attach their src while the tile is playing — an idle tile holds no video decoder or buffers (61MB of mp4s across 9 tiles)
- Work archive: clip-wipe card reveal is desktop-only — on phones the snap scrolling fired it late so cards popped in from nothing; they're simply visible now

## 2026-07-07 (later)
- Mobile: snap switched to `mandatory` on phones — iOS Safari barely honors `proximity`, so live Safari rested between sections; tall scroll-driven sections still scrub freely (covering snap areas)
- Services grid: mobile videos no longer autoplay — a tap plays a tile (label fades, full brightness), tapping again or tapping another tile reverts it
- Work archive: subtitle hidden on mobile until the header is tapped (was always visible)
- Work sections: card images fetch eagerly at low priority instead of lazily, so they're loaded before you scroll to them

## 2026-07-07
- Mobile: snap container and full-screen stages sized with 100dvh — snap edges, the gallery floor, and the scroll hint no longer hide behind the browser chrome
- Services grid: tiles autoplay their videos while on screen on touch devices (no hover on phones, so they used to sit on a black first frame)
- Showreel: ghost snap steps removed on mobile — the zoom intro is disabled there, so the section is a single screen instead of five screens of dead scroll
- Pricing: section grows with the stacked cards on mobile instead of nesting its own scroller, which trapped the scroll on iOS before the next section
- Work archive: mobile intro tightened — smaller headline, fixed 14px spacing, subtitle always visible (it was hover-revealed)

## 2026-07-06
- Preloader: stays up a minimum of 3 seconds, counting smoothly to 100 even with cached images
- Services grid: hovering a tile fades the service name out while its video plays at full brightness
- Services grid: all nine tile videos replaced with Create Studio's own reels (AI Video Production compressed from 4K to 1080p)
- Work: section rebuilt nudot-style — sticky Anton title over a moving ethereal background, cards scroll over it one by one with clip-reveal + parallax, 3D tilt cards with labels kept, caption appears on hover
- Work: card sizes follow each image's natural aspect ratio, capped at 80% of viewport height
- Navbar/footer: "Work" links point at the new section; nav goes white + dark glass over it
- Scroll: snap switched from mandatory to proximity so fast scrolling no longer skips the About tablet transition
- Showreel: mobile starts fully fitted instead of zoomed — tablet no longer cut at the edges
- Repo: public/ mp4 assets (services tiles, showreel, footer) are no longer gitignored, so deploys include them

## 2026-07-03 (evening)
- About: "Create Studio" in the copy rendered with the brand gradient
- About collage: blue network render replaced with the pink fluid image
- Contact: "Book a Consultation" CTA restyled to match the shared dark-pill CTA, now opens mail to sales@thecreate.studio
- Contact: subtitle split into two lines, em-dash removed
- Footer: "We make" services list replaced with vertical section nav links
- Footer: phone number removed, email switched to sales@thecreate.studio, real LinkedIn/Instagram links
- Footer: contact block and social icons height-matched and centered; right column bottom-aligned
- Static assets (images/fonts/video) now served with a year-long immutable browser cache
- Work/About/Work-showcase images switched to static imports — content-hashed URLs bust the cache automatically when a file is replaced

## 2026-07-03
- Preloader: gradient "Creator." in the welcome line
- Hero: intro paragraph forced to two lines
- Gallery: big Anton title that fades on scroll, brighter scroll hint
- Showreel: centered play/pause control, section cursor fixed, scroll-scale animation restored
- Pricing: left-aligned Anton title, larger cards, "Get in Touch" CTA
- All CTAs: animated conic-gradient border (hover.dev port)
- Our Work: Aceternity 3D tilt cards, 8 new project images with matching labels
- About collage: swapped blue network render with tea-terrace image

## 2026-06-29
- Initial deploy: image trail hero (Section 02) live on Vercel
- Session 2 token finished
- Session 3 token finished.
- Session 4 token finished
- Session 5 Token Khatam
- Session 6
- Session 7
- Session 8
- Session 9
- Session 10
- Session 11
- session 13
- Session 14
- Session 15
- Session 16
- Session 17
- Session 18
- Session 19
- Session 20
- session 21
- Session 22
