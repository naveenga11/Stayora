# Stayora — Stay Somewhere Special

A full-stack Airbnb-style vacation rental web application built with Node.js, Express, MongoDB, and EJS. Users can browse listings, create their own stays, leave reviews, and manage their account — all with image uploads powered by Cloudinary.

---

## Features

- **Browse Listings** — responsive card grid with images, location, and price per night
- **Search** — searches across title, location, country, and description via the navbar
- **Category Filters** — filter by Trending, Rooms, Mountain, Castles, Pools, Camping, Snow, Farms, City, Beach, and Café
- **Tax Toggle** — show/hide +18% GST on listing prices
- **Authentication** — sign up, log in, and log out with Passport.js (local strategy)
- **Create Listings** — add a title, description, price, location, country, and an optional image
- **Edit / Delete Listings** — restricted to the listing owner
- **Image Uploads** — images stored on Cloudinary via Multer
- **Reviews** — logged-in users can leave star ratings and comments on any listing
- **Delete Reviews** — restricted to the review author
- **Flash Messages** — animated success/error toasts for all user actions
- **Form Validation** — server-side via Joi, client-side via Bootstrap's native validation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 24 |
| Framework | Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Templating | EJS + ejs-mate (layouts) |
| Auth | Passport.js + passport-local-mongoose |
| Image Storage | Cloudinary + multer-storage-cloudinary |
| Sessions | express-session + connect-mongo |
| Validation | Joi |
| Styling | Bootstrap 5.3 + Custom CSS (Plus Jakarta Sans) |
| Icons | Font Awesome 6.5 |

---

## Project Structure

```
Stayora/
├── app.js                  # Express app entry point
├── cloudConfig.js          # Cloudinary + Multer storage setup
├── middlewear.js           # Auth, ownership, and validation middleware
├── schema.js               # Joi validation schemas
│
├── controllers/
│   ├── listings.js         # Listing CRUD + search logic
│   ├── reviews.js          # Review create/delete
│   └── users.js            # Signup / login / logout
│
├── models/
│   ├── listing.js          # Listing Mongoose schema
│   ├── review.js           # Review Mongoose schema
│   └── user.js             # User schema (passport-local-mongoose)
│
├── routes/
│   ├── listing.js          # /listings routes
│   ├── review.js           # /listings/:id/reviews routes
│   └── user.js             # /signup, /login, /logout routes
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Base HTML layout
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs       # Browse all listings
│   │   ├── show.ejs        # Single listing detail
│   │   ├── new.ejs         # Create listing form
│   │   └── edit.ejs        # Edit listing form
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css       # Global styles + design system
│   │   └── rating.css      # Star rating display
│   └── js/
│       └── script.js
│
└── init/
    ├── data.js             # Seed data
    └── index.js            # DB seed script
```

---

## Routes

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/listings` | Browse all listings (supports `?q=` search) | No |
| GET | `/listings/new` | New listing form | Yes |
| POST | `/listings` | Create a listing | Yes |
| GET | `/listings/:id` | View a listing | No |
| GET | `/listings/:id/edit` | Edit listing form | Yes (owner only) |
| PUT | `/listings/:id` | Update a listing | Yes (owner only) |
| DELETE | `/listings/:id` | Delete a listing | Yes (owner only) |
| POST | `/listings/:id/reviews` | Post a review | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review | Yes (author only) |
| GET | `/signup` | Sign up form | No |
| POST | `/signup` | Create account | No |
| GET | `/login` | Login form | No |
| POST | `/login` | Authenticate | No |
| GET | `/logout` | Log out | Yes |

---

## Search

The navbar search sends a `GET` request to `/listings?q=<query>`. The server runs a case-insensitive regex match across `title`, `location`, `country`, and `description`. Results show a count and a **Clear search** link to reset.

---

## Author

**Naveen G A**
