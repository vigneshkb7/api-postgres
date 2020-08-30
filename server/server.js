require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const rest = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      status: "success",
      results: rest.rows.length,
      data: {
        restaurants: rest["rows"],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // IMPORTANT ***** don't use template strings inside the query i will cause the sql injection errors
    const rest = await db.query("SELECT * FROM restaurants WHERE id= $1", [id]);

    res.status(200).json({
      status: "success",

      data: {
        restaurants: rest["rows"][0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    const rest = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) returning *",
      [name, location, price_range]
    );
    res.status(200).json({
      status: "success",

      data: {
        restaurants: rest["rows"][0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;

    const rest = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",

      data: {
        restaurants: rest["rows"][0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rest = await db.query("DELETE FROM restaurants WHERE id= $1", [id]);

    res.status(200).json({
      status: "success",

      data: {
        restaurants: rest["rows"][0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`app-- is listening on port ${PORT}`));
