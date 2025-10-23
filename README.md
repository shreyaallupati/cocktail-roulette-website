# 🍹 Cocktail Roulette

A fun and interactive web app to discover cocktails using TheCocktailDB API.

## Features

- 🎰 **Random Cocktail Generator** - Spin the roulette for a surprise drink
- 🔍 **Search** - Find cocktails by name
- 📚 **Browse by Letter** - Explore cocktails alphabetically
- 🎯 **Filter** - Filter by category, glass type, or ingredient
- 📖 **Detailed Recipes** - View full ingredients, instructions, and videos

## Project Structure

```
cocktail-roulette/
├── server.js                 # Express server
├── package.json              # Dependencies
├── views/
│   ├── index.ejs            # Home page (random cocktail)
│   ├── search.ejs           # Search page
│   ├── browse.ejs           # Browse by letter
│   ├── filter.ejs           # Filter page
│   ├── cocktail.ejs         # Cocktail detail page
│   ├── error.ejs            # Error page
│   └── partials/
│       └── navbar.ejs       # Navigation bar
└── public/
    └── style.css            # Styles

```

## Setup Instructions

1. **Create the project directory and files**

   ```bash
   mkdir cocktail-roulette
   cd cocktail-roulette
   ```

2. **Create the folder structure**

   ```bash
   mkdir views views/partials public
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the server**

   ```bash
   npm start
   ```

   Or for development with auto-restart:

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## API Reference

This project uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php) with the free test key.

### Main Endpoints Used:

- Random cocktail: `/random.php`
- Search by name: `/search.php?s={query}`
- Browse by letter: `/search.php?f={letter}`
- Lookup by ID: `/lookup.php?i={id}`
- Filter by category/glass/ingredient: `/filter.php?c={category}`
- List categories/glasses/ingredients: `/list.php?c=list`

## Technologies

- **Backend**: Node.js + Express
- **Template Engine**: EJS
- **HTTP Client**: Axios
- **Styling**: Custom CSS with gradients and animations

## Screenshots

- Home page with random cocktail roulette
- Search functionality
- Alphabetical browsing
- Advanced filtering options
- Detailed cocktail recipes with ingredients

Enjoy discovering new cocktails! 🍸
# cocktail-roulette
# cocktail-roulette-website
