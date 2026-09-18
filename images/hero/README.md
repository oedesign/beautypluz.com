# Homepage hero images

The homepage carousel loads its images from this folder. To update a slide, add
an optimised image here and change that slide's `image.src` value in
[`js/hero-carousel.js`](../../js/hero-carousel.js).

## Recommended image preparation

- Use WebP or AVIF where possible.
- Export a landscape image that is at least **1920 × 1080 px**.
- Keep important subjects away from the outer edges: the carousel uses
  `object-fit: cover` so it can crop gracefully at every viewport size.
- Set the per-slide `image.position` value (for example, `center`, `60% center`,
  or `center top`) when a subject needs to remain in a particular part of the
  frame.

Add, remove, or reorder slide objects in the `SLIDES` array without changing
any carousel behaviour. Each object contains the image path and crop position
alongside the editable text and links.

## Source control

Hero WebP files are tracked with **Git LFS** so regular Git and pull-request
diffs contain small text pointers instead of binary image blobs. Keep the
`images/hero/*.webp` files in this directory and stage them normally with
`git add images/hero/<file>.webp`; Git LFS will stage the pointer and upload the
actual image when the branch is pushed to an LFS-enabled remote.

If the PR service used for this repository cannot upload LFS objects, commit
and push the code/LFS pointers first, then upload these exact LFS objects from
a Git LFS-enabled clone before opening the PR:

```bash
git lfs push --all origin <branch-name>
```

The three current required assets are `hero-collection.webp`,
`hero-natural-ritual.webp`, and `hero-new-arrivals.webp`. Do not replace their
tracked pointers with base64 or placeholder files.
