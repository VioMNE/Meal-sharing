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

router.post('/', async (req, res) => {
  try {
    const newReview = req.body;
      const insertedReview = await knex('reviews').insert(newReview);
      res.status(201).json(insertedReview);
  } catch (error) {
    res.status(500).send("error");
    throw error;;
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