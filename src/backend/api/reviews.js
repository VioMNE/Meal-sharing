const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all  review
router.get('/', async (req, res) => { 
  try {
    const reviews = await knex('review').select('*');
    response.json(reviews);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});


//POST - adds a new all review  to the database

router.post("/", async (request, response) => {
  try {
    const review = {
      title: request.body.title,
      description: request.body.description,
      meal_id: request.body.mealId,
      stars: request.body.stars,
      created_date: new Date(),
    };
    const newReviewIds = await knex("review").insert(review);
    const newReviewId = newReviewIds[0];
    const newReview = await knex("review").where({ id: newReviewId }).first();
    if (!newReview) {
      throw new Error("Unable to insert new review");
    }
    response.json(newReview);
  } catch (error) {
    throw error;
  }
});



// GET - returns the all review  by id 
router.get('/:id', async (req, res) => {
  try {
    const reviwsId = req.params.id;
    const reviews = await knex('review').where({ id: reviwsId });
    if (reviews) {
        res.json(reviews);
      } else {
        res.status(404).json("Review with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});

// PUT - updates the all review  by id
router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updateReview = await knex('review').where({ id: reviewId }).update(req.body);
    if (updateReview) {
        res.send('Review successfully updated.');
      } else {
        res.status(404).json("Review with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;; 
  }
  
});

// DELETE - deletes the all review by id

router.delete('/:id', async (req, res) => { 
  try {
    const reviewId = req.params.id;
    const deleteReview = await knex('review').where({ id: reviewId }).del();
    if (deleteReview) {
        res.send('Review successfully deleted.');
      } else {
        res.status(404).json("Review with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});

module.exports = router;