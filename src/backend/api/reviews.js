const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all  reviews
router.get('/', async (req, res) => { 
  try {
    const review = await knex('reviews').select('*');
    response.json(review);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});


//POST - adds a new all Reviews  to the database

router.post("/", async (request, response) => {
  try {
    const review = {
      title: request.body.title,
      description: request.body.description,
      meal_id: request.body.mealId,
      stars: request.body.stars,
      created_date: new Date(),
    };
    const newReviewIds = await knex("reviews").insert(review);
    const newReviewId = newReviewIds[0];
    const newReview = await knex("reviews").where({ id: newReviewId }).first();
    if (!newReview) {
      throw new Error("Unable to insert new review");
    }
    response.json(newReview);
  } catch (error) {
    throw error;
  }
});



// GET - returns the all Reviews  by id 
router.get('/:id', async (req, res) => {
  try {
    const reviwsId = req.params.id;
    const review = await knex('reviews').where({ id: reviwsId });
    if (review) {
        res.json(review);
      } else {
        res.status(404).json("Review with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});

// PUT - updates the all reviews  by id
router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updateReview = await knex('reviews').where({ id: reviewId }).update(req.body);
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

// DELETE - deletes the all reviews by id

router.delete('/:id', async (req, res) => { 
  try {
    const reviewId = req.params.id;
    const deleteReview = await knex('reviews').where({ id: reviewId }).del();
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