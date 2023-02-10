const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all meals 
router.get('/', async (req, res) => { 
  try {
    const meals = await knex('meal').select('*');
    response.json(meals);
  } catch (error) {
    throw error;
  }
  
});

// POST - adds a new meal to the database 
router.post('/', async (req, res) => {
  try {
    const newMeal = req.body;
    const insertedMeal = await knex('meal').insert(newMeal);
    response.json(insertedMeal)
  } catch (error) {
    throw error;
  }
  
});


// GET - returns the meal by id 
router.get('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const meal = await knex('meal').where({ id: mealId });
    response.json(meal);
  } catch (error) {
    throw error;
  }
  
});

// PUT - updates the meal by id
router.put('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const updateMeal = await knex('meal').where({ id: mealId }).update(req.body);
    response.json(updateMeal);
  } catch (error) {
    throw error; 
  }
  
});

// DELETE - deletes the meals by id

router.delete('/:id', async (req, res) => { 
  try {
    const mealId = req.params.id;
    const deleteMeal = await knex('meal').where({ id: mealId }).del();
    response.json(deleteMeal);
  } catch (error) {
    throw error;
  }
  
});

module.exports = router;




