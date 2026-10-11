# Cleaning-service template (instant quote)

A one-page site for a home-cleaning company. The main feature is a **room-by-room estimate builder**: visitors set how many of each room they have, tick the services they want, choose how often, and see a live price range. They then send a request, and the email includes every room and service they picked.

It's plain HTML, CSS and JS with no build step, and every path is relative.

The demo content is a fictional company called "Bright Nest Cleaning Co." in Spartanburg, SC.

## What it does

- **Room cards** (bedroom, bathroom, kitchen, living room, dining room, den/office, laundry room, hallway/stairs):
  - Each card has a quantity stepper and a checklist of services with a price per room.
  - Common services are ticked by default. Ticking a service on a room set to 0 adds one of that room.
- **Den / office**:
  - Includes a per-item **taxidermy dusting** service with its own counter, priced per mount.
- **Whole-home extras** are flat add-ons, such as inside windows or pet hair treatment.
- **Frequency discounts** are one time, monthly (−10%), every 2 weeks (−15%) and weekly (−20%).
- **Estimate**:
  - Shown as a range (−10% / +15% around the calculated price), with a minimum visit price.
  - A disclaimer explains that prices assume an average 2,100 sq ft home.
- **Sticky summary** on desktop. On phones, a floating estimate bar appears while you're choosing rooms.
- **Saved on the device**: selections are stored in `localStorage`, so a visitor who leaves and comes back finds their picks still there.
- **Request form**:
  - Sent through [FormSubmit](https://formsubmit.co) via AJAX.
  - The email has one row per room listing the exact services, the extras, the frequency and discount, and the estimate. It also includes the visitor's details, preferred date and time window, and home size.
  - The page shows a green note on success and a red note with FormSubmit's actual reason on failure.

## Customizing it for a customer

1. **Copy the folder**: `cp -r templates/cleaning <customer-folder>`
2. **Prices and rooms**: everything is in the `CUSTOMIZE` block at the top of `script.js`.
   - `ROOMS`: each room has a `count` (the default for a typical home), a `max`, and `services`, each with a `price` per room. Set `on: true` to tick a service by default. A service with `per` (for example `per: 'mount', perPlural: 'mounts'`) is priced per item and gets its own counter.
   - `EXTRAS` and `FREQUENCIES`: flat add-ons and discount levels.
   - `HOME_SIZE`, `MINIMUM` and `RANGE`: the size the prices assume (shown in the disclaimer), the minimum visit price, and how wide the estimate range is.
   - If you rename or remove services, visitors' old saved picks are matched by `id` and anything that no longer exists is ignored.
3. **Where requests go**:
   - Set `FORM_ENDPOINT` in `script.js` and the form `action` in `index.html` to the customer's FormSubmit address, or to the private ID FormSubmit emails after activation.
   - The first submission to a new address triggers FormSubmit's one-time activation email.
4. **Brand colors and fonts**: edit the `:root` block at the top of `styles.css`. Usually changing `--accent`, `--accent-dark` and `--tint` is enough.
5. **Text**: every editable spot in `index.html` is marked with a `CUSTOMIZE` comment, including the business name, the disclaimer, the FAQ and the contact details.

## PR previews

A pull request that only changes files in `templates/cleaning/` gets a preview at
`https://robbytee.github.io/templates/cleaning/pr-preview/pr-<number>/`.
