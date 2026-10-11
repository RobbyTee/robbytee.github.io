# Multi-page template

A small site split into four pages. It uses the same Hearth & Grain demo branding, photos and voice as `templates/one-page`.

| Page | What's on it |
| --- | --- |
| `index.html` | Hero, short story and link cards to the other pages |
| `menu.html` | Three menu sections with prices |
| `reviews.html` | **Google-style reviews**: rating summary, star breakdown, and the 5 newest reviews rated 4+ stars |
| `visit.html` | Address, directions, phone, email and hours. There's no form. |

It's plain HTML, CSS and JS with no build step, and every path is relative.

## Customizing it for a customer

1. **Copy the folder**: `cp -r templates/multi-page <customer-folder>`
2. **Brand colors and fonts**: edit the `:root` block at the top of `styles.css`.
3. **Text**: every editable spot is marked with a `CUSTOMIZE` comment. The header and footer are repeated on every page, so update the business name in all four files. A find-and-replace on "Hearth" works.
4. **Photos**: replace the files in `img/` and update the `alt` text.
5. **Reviews**: edit `reviews.js` only. The reviews page builds itself from it.

## Reviews (`reviews.js`)

The demo reviews are **samples** for a fictional business. Before going live, replace them with real reviews copied from the customer's Google Business Profile:

- **`REVIEWS_SETTINGS`**:
  - `rating`, `total` and `breakdown` (the review count for each star level): copy these from Google.
  - `allReviewsUrl`: the link to the business's reviews on Google Maps.
  - `writeReviewUrl`: the "Get more reviews" share link from the Business Profile.
  - `sample`: set it to `false` once the reviews are real. That changes the note under the reviews from "Sample reviews shown for demonstration" to "Recent reviews from Google".
- **`REVIEWS`**: one entry per review. Copy the reviewer's name and the review text exactly as they appear on Google, and use the real post `date` (`"YYYY-MM-DD"`). The demo entries use `daysAgo` so their dates stay fresh; don't use it for real reviews. `subtitle`, `tags`, `reply` and `color` are optional.

The page sorts by date and shows the **5 newest reviews rated 4 or 5 stars**, so you can paste in extra reviews and it will pick the right ones. Times like "2 weeks ago" are worked out from each review's date, and a "NEW" badge shows for anything under a week old.

Only use real reviews, with the reviewer's words unchanged. Made-up or edited reviews on a live business's site break Google's terms and FTC rules.

## Demo photo credits

These are the same Wikimedia Commons photos as `templates/one-page`. See the credits table in that template's README, which still needs filling in.

## PR previews

A pull request that only changes files in `templates/multi-page/` gets a preview at
`https://robbytee.github.io/templates/multi-page/pr-preview/pr-<number>/`.
