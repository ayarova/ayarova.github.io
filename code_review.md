# Code review — Soulsborne Carrd

## Architecture

The template uses only HTML + CSS + vanilla JavaScript. No framework, npm install,
bundler or external JS library is required.

Recommended Carrd setup:
1. Embed #1 — Type: Code / Style: Hidden / Location: Head
   - paste `carrd_soulsborne.css`
2. Embed #2 — Type: Code / Style: Inline
   - paste `carrd_soulsborne.html`
3. Embed #3 — Type: Code / Style: Hidden / Location: Body End
   - paste `carrd_soulsborne.js`

This keeps the editable text/content separate from the styling and interaction code.

## What is good

- CSS is scoped under `.soulsborne-carrd`, reducing collisions with Carrd styles.
- Palette is centralized in CSS variables, so the whole theme is easy to recolor.
- Responsive layout collapses to a single column on small screens.
- `prefers-reduced-motion` is supported.
- Navigation is keyboard-accessible because it uses real `<button>` elements.
- Hover sound is optional and has a dependency-free WebAudio fallback.
- JavaScript fails softly: if audio is unavailable, the page still works.
- No third-party JS library means fewer failure points and faster load time.
- Image URLs are intentionally exposed in the markup so the user can swap artwork without
  touching the CSS.

## Important browser/Carrd limitation

Hover audio cannot be guaranteed before a user interaction because browsers restrict
unexpected audio playback. This implementation "unlocks" audio after the first click/tap,
then uses hover sounds. The visual hover animation still works immediately.

For a production page, upload/host a tiny MP3 or WAV and set `AUDIO_URL` in the JS.

## Accessibility

The page has:
- semantic `header`, `nav`, `main`, `section`, `article`;
- visible keyboard focus states;
- reduced-motion support;
- screen-reader status text for audio feedback.

Further improvement would be adding meaningful alt text / aria labels to every decorative
image if the images convey content rather than atmosphere.

## Visual fidelity

The composition intentionally follows the reference:
- large dark centered shell;
- narrow top identity strip;
- wide hero banner;
- 4-button navigation row;
- asymmetrical 2-column content area;
- image-led left feature card;
- dense text list on the right;
- wide split card at the bottom;
- rounded corners, thin borders, dark overlays and warm ivory typography.

The template does not copy the reference images themselves. Image slots are replaceable.

## Suggested next polish

For an even closer "Soulsborne" result, use 3–5 original dark artwork pieces:
- one wide cathedral/ruin image for the hero;
- one character/statue image for the left card;
- one battle/architecture image for the bottom strip;
- optionally one very subtle full-page background texture.

Keep those images dark and desaturated so the #f5e3c2 / #fcf0d9 text remains the visual
focus.
