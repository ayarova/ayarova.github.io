# Soulsborne-style Carrd template

Files:
- `carrd_soulsborne.html` — editable content/markup
- `carrd_soulsborne.css` — theme and hover animation
- `carrd_soulsborne.js` — section navigation + hover sound
- `hover_animation_prompt.txt` — prompt for generating the hover animation
- `hover_sound_prompt.txt` — prompt for generating the hover SFX
- `code_review.md` — code review and limitations

## Palette

- #281f1f — warm black/brown page background
- #1d1d1d — main panel
- #f5e3c2 — primary typography
- #fcf0d9 — bright highlights/glows

## Carrd setup

Custom HTML/CSS/JS needs Carrd's Embed/custom-code capability. Put the CSS in a hidden
Head embed, the HTML in an inline embed, and the JS in a hidden Body End embed.

Then edit:
1. `YOUR TITLE HERE`
2. top credit
3. all card text
4. `PASTE_HERO_IMAGE_URL`
5. `PASTE_LEFT_IMAGE_URL`
6. `PASTE_BOTTOM_IMAGE_URL`
7. `href="#"` links
8. `AUDIO_URL`

The code is intentionally split so text and artwork can be changed without rewriting
the interaction logic.
