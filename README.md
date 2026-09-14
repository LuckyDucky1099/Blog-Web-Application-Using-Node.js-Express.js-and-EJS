# MiniBlog — Node.js + Express + EJS Blog App

A simple, responsive blog web app where anyone can create, view, edit, and delete
posts. Posts are stored in memory only, restarting the server resets the data
(no database).

## Features

- Create posts with author name, title, content, category, and an autoset timestamp
- View all posts on the homepage and read a full post on its own page
- Edit any post via a prefilled form
- Delete any post (no user accounts anyone can delete anything)
-Bonus: Categories — assign a category (Tech, Lifestyle, Education, Travel,
  Food, Other) to each post and filter the homepage by category using the chip bar
- Responsive customstyled UI (no Bootstrap) that works on desktop and mobile
- Basic 404 page and form validation (emptyfield errors)

## Project structure

```
blog-app/
├── server.js              # Express app, routes, in-memory posts array
├── views/
│   ├── index.ejs           # Homepage — post list + category filter
│   ├── show.ejs             # Single post view
│   ├── new.ejs               # Create-post form
│   ├── edit.ejs               # Edit-post form (pre-filled)
│   ├── 404.ejs                 # Not-found page
│   └── partials/
│       ├── header.ejs          # <head>, nav
│       └── footer.ejs          # closing tags, footer
├── public/
│   └── css/style.css       # All styling, responsive breakpoints included
└── package.json
```

## Routes

| Method | Path                | Purpose                                |
|--------|---------------------|------------------------------------------|
| GET    | `/`                 | List all posts (supports `?category=`)   |
| GET    | `/posts/new`        | Show "create post" form                  |
| POST   | `/posts`            | Create a new post                        |
| GET    | `/posts/:id`        | View a single post                       |
| GET    | `/posts/:id/edit`   | Show "edit post" form (pre-filled)       |
| POST   | `/posts/:id/edit`   | Save changes to a post                   |
| POST   | `/posts/:id/delete` | Delete a post                            |


## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open the app
# http://localhost:3000
```

## Tech used

- **Express.js** — routing and server
- **EJS** — server-rendered templates
- Plain CSS with custom design tokens (no framework) for a distinctive, responsive UI
