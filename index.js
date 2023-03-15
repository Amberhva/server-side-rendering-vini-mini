import express from "express";

// Link naar de api van vini mini
const url = "https://api.vinimini.fdnd.nl/api/v1";
const data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);

// Maak een nieuwe express app
const app = express();

// Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Maak een route naar de index.ejs voor categorieën
app.get("/", (request, response) => {
    let categoriesUrl = url + "/categories";

    fetchJson(categoriesUrl).then((data) => {
        response.render("index", data);
    });
});

// Maak een route naar de ei.ejs
app.get("/ei", async (request, response) => {
    let productenUrl = url + "/producten";

    await fetchJson(productenUrl).then((data) => {
        response.render("ei", data);
    });
});

// Maak een route naar de pinda.ejs
app.get("/pinda", async (request, response) => {
    let productenUrl = url + "/producten";

    await fetchJson(productenUrl).then((data) => {
        response.render("pinda", data);
    });
});

// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
}
