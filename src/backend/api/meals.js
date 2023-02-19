const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all meals 
router.get('/', async (req, res) => { 
  try {
    const meals = await knex('meals').select('*');
    res.json(meals);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});

// POST - adds a new meal to the database 
router.post('/', async (req, res) => {
  try {
    const newMeal = req.body;
    const insertedMeal = await knex('meals').insert(newMeal);
    res.status(201).json(insertedMeal);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});


// GET - returns the meal by id 
router.get('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const meal = await knex('meals').where({ id: mealId });
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json("Meal with the specified ID was not found.");
    }
  } catch (error) {
      res.status(500).send("error");
    throw error;
  }
  
});

// PUT - updates the meal by id
router.put('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const updateMeal = await knex('meals').where({ id: mealId }).update(req.body);
    if (updateMeal) {
      res.send('Meal successfully added.');
    } else {
      res.status(404).json("Meal with the specified ID was not found.");
    }
  } catch (error) {
      res.status(500).send("error");
    throw error;
  }
  
});

// DELETE - deletes the meals by id

router.delete('/:id', async (req, res) => { 
  try {
    const mealId = req.params.id;
    const deleteMeal = await knex('meals').where({ id: mealId }).del();
    if (deleteMeal) {
      res.send('Meal successfully deleted.');
    } else {
      res.status(404).json("Meal with the specified ID was not found.");
    }
  } catch (error) {
      res.status(500).send("error");
    throw error;
  }
  
});


router.get("/", async (req, res) => {
  const meals = knex.select().from("meal");

  if ("maxPrice" in req.query) {
    const maxPrice = Number(req.query.maxPrice);
    if (isNaN(maxPrice)) {
      res.send("maxPrice should be a number!");
      return;
    }
    meals.where("price", "<", maxPrice);
  }

  if ("availableReservations" in req.query) {
    const reqAvailReservation = req.query.availableReservations;
    if (reqAvailReservation !== "true") {
      res.send("enter true value of availableReservations!");
      return;
    }
    meals.select(
      "meal.id",
      "meal.title",
      knex.raw("(meal.max_reservations)-(reservation.number_of_guests) AS AvailableReservation")
    )
    .leftJoin("reservation", "meal.id", "reservation.meal_id")
    .whereRaw("((max_reservations)-(number_of_guests)) > 0");
  }

  if ("title" in req.query) {
    const title = req.query.title;
    if (!isNaN(title)) {
      res.send("Title should be a string!");
      return;
    }
    meals.where("title", "like", `%${title}%`);
  }

  if ("dateAfter" in req.query) {
    const reqDate = new Date(req.query.dateAfter);
    meals.where("when_date", ">", reqDate);
  }

  if ("dateBefore" in req.query) {
    const dateReq = new Date(req.query.dateBefore);
    meals.where("when_date", "<", dateReq);
  }

  if ("limit" in req.query) {
    const limit = Number(req.query.limit);
    if (isNaN(limit)) {
      res.send("enter a number!");
      return;
    }
    meals.limit(limit);
  }

  if ("sort_key" in req.query) {
    const sortKey = req.query.sort_key;
    const sortDir = req.query.sort_dir;
    const array = ["price", "when_date", "max_reservations"];
    if (array.includes(sortKey)) {
      meals.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc");
    }
  }

  try {
    const findTableData = await meals;
    if (findTableData.length === 0) {
      res.status(404).json("Table data is not available");
    } else {
      res.json(findTableData);
    }
  } catch (error) {
    res.status(404).json({ error: "Bad Get Request" });
  }
});

// GET - /api/meals/:meal_id/reviews

router.get("/:meal_id/reviews", async (req, res) => {
  try {
    const meal = await knex("meal")
      .select("id", "title")
      .where("id", parseInt(req.params.meal_id))
      .first();
    
    if (!meal) {
      return res.status(404).send(`Meal with id ${req.params.meal_id} not found`);
    }

    const reviews = await knex("review")
      .select("*")
      .where("meal_id", parseInt(req.params.meal_id));

    if (reviews.length === 0) {
      return res.status(404).send(`No reviews found for meal with id ${req.params.meal_id}`);
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(503).send(error.message);
  }
});
    



module.exports = router;




