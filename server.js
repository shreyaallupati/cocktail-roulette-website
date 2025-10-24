const express = require("express");
const axios = require("axios");
const path = require("path");
const sharp = require("sharp");

const app = express();
const PORT = 3000;
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Image compression and proxy route
app.get("/image-proxy", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send("Image URL is required.");
  }

  try {
    // Fetch the image from the external API
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Use sharp to process and compress the image
    const compressedImageBuffer = await sharp(response.data)
      .resize(300) // Example: Resize to a max width of 300px
      .webp({ quality: 80 }) // Example: Convert to WebP format with 80% quality
      .toBuffer();

    // Set appropriate headers and send the compressed image
    res.set("Content-Type", "image/webp");
    res.set("Content-Length", compressedImageBuffer.length);
    res.send(compressedImageBuffer);
  } catch (error) {
    console.error("Error compressing image:", error);
    res.status(500).send("Failed to process image.");
  }
});


// Home page - random cocktail showcase
app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${API_BASE}/random.php`);
    res.render("index", { cocktail: data.drinks[0] });
  } catch (error) {
    res.render("error", { message: "Failed to fetch cocktail" });
  }
});

// Search page
app.get("/search", (req, res) => {
  res.render("search", { cocktails: null, query: "" });
});

app.post("/search", async (req, res) => {
  const query = req.body.query;
  try {
    const { data } = await axios.get(`${API_BASE}/search.php?s=${query}`);
    res.render("search", { cocktails: data.drinks, query });
  } catch (error) {
    res.render("search", { cocktails: null, query, error: "Search failed" });
  }
});

// Browse by letter
app.get("/browse", async (req, res) => {
  const letter = req.query.letter || "a";
  try {
    const { data } = await axios.get(`${API_BASE}/search.php?f=${letter}`);
    res.render("browse", { cocktails: data.drinks, letter });
  } catch (error) {
    res.render("browse", { cocktails: null, letter });
  }
});

// Filter page
app.get("/filter", async (req, res) => {
  try {
    const [categories, glasses, ingredients] = await Promise.all([
      axios.get(`${API_BASE}/list.php?c=list`),
      axios.get(`${API_BASE}/list.php?g=list`),
      axios.get(`${API_BASE}/list.php?i=list`),
    ]);

    res.render("filter", {
      categories: categories.data.drinks,
      glasses: glasses.data.drinks,
      ingredients: ingredients.data.drinks.slice(0, 50),
      cocktails: null,
    });
  } catch (error) {
    res.render("error", { message: "Failed to load filters" });
  }
});

app.post("/filter", async (req, res) => {
  const { filterType, filterValue } = req.body;
  const filterMap = { category: "c", glass: "g", ingredient: "i" };

  try {
    const [categories, glasses, ingredients, results] = await Promise.all([
      axios.get(`${API_BASE}/list.php?c=list`),
      axios.get(`${API_BASE}/list.php?g=list`),
      axios.get(`${API_BASE}/list.php?i=list`),
      axios.get(
        `${API_BASE}/filter.php?${filterMap[filterType]}=${filterValue}`
      ),
    ]);

    res.render("filter", {
      categories: categories.data.drinks,
      glasses: glasses.data.drinks,
      ingredients: ingredients.data.drinks.slice(0, 50),
      cocktails: results.data.drinks,
    });
  } catch (error) {
    res.render("error", { message: "Filter failed" });
  }
});

// Cocktail details
app.get("/cocktail/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${API_BASE}/lookup.php?i=${req.params.id}`
    );
    const cocktail = data.drinks[0];

    // Extract ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure: measure || "" });
      }
    }

    res.render("cocktail", { cocktail, ingredients });
  } catch (error) {
    res.render("error", { message: "Cocktail not found" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🍹 Cocktail Roulette running on http://localhost:${PORT}`);
});
