# One-page template

A single scrolling page with these sections: hero, story, three feature cards, a photo carousel, and contact details with opening hours. There's no contact form. It's plain HTML, CSS and JS with no build step, and every path is relative, so you can copy the folder anywhere.

The demo content is a fictional bakery and café called "Hearth & Grain Bakehouse".

## Customizing it for a customer

1. **Copy the folder**: `cp -r templates/one-page <customer-folder>`
2. **Brand colors and fonts**: edit the `:root` block at the top of `styles.css`. Usually `--accent` and `--accent-dark` are all you need to change.
3. **Text**: every editable spot in `index.html` is marked with a `CUSTOMIZE` comment. Update the business name in three places: `<title>`, `.brand` and the footer. Then update the address, phone, email, map link and hours in `#visit`.
4. **Photos**: replace the files in `img/` and keep the same file names, or change the `src`. Update each `alt` text too.

| File | Where | Shape |
| --- | --- | --- |
| `hero.jpg` | Full-screen top banner. Text sits on the left, so keep the subject on the right. | Wide, 2000px+ |
| `story.jpg` | Beside "Our story" | 4:3 |
| `feature-*.jpg` | The three cards | 4:3 |
| `gallery-*.jpg` | Carousel | 3:2. On phones it's cropped to 4:3. |

Keep each photo under about 300 KB (JPEG quality 70–80).

5. **Carousel**: add or remove `<li class="slide">` items. The dots update themselves. Set the autoplay speed with `data-interval` (in milliseconds).
6. **Credits**: if you use someone else's photos, put the author and licence in the footer's `.credits` line.

## Demo photo credits

All demo photos come from Wikimedia Commons. Add each author and licence here before the template is used publicly:

| File | Subject | Author / license |
| --- | --- | --- |
| `hero.jpg` | Brass coffee-bean dispensers | _TBD_ |
| `story.jpg` | Hands shaping seeded dough | _TBD_ |
| `feature-coffee.jpg` | Latte and black coffee on wood | _TBD_ |
| `feature-bread.jpg` | Baguettes on a tray | _TBD_ |
| `feature-pastry.jpg` | Croissant and cappuccino | _TBD_ |
| `gallery-1.jpg` | Café dining room | _TBD_ |
| `gallery-2.jpg` | Croissant rack | _TBD_ |
| `gallery-3.jpg` | Pastry display case | _TBD_ |
| `gallery-4.jpg` | Espresso on a wooden tray | _TBD_ |
| `gallery-5.jpg` | Cortado with latte art | _TBD_ |
| `gallery-6.jpg` | Roasted coffee beans | _TBD_ |

## PR previews

A pull request that only changes files in `templates/<name>/` gets a preview at
`https://robbytee.github.io/templates/<name>/pr-preview/pr-<number>/`.
