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

module.exports = router;




