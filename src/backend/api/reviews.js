const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all  review
router.get('/', async (req, res) => { 
  try {
    const reviews = await knex('review').select('*');
    res.json(reviews);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});


//POST - adds a new all review  to the database

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const review = {
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: req.body.stars,
      created_date: new Date(),
    };
    const newReviewIds = await knex("review").insert(review);
    const newReviewId = newReviewIds[0];
    const newReview = await knex("review").where({ meal_id: newReviewId });
    if (!newReview) {
      console.log("no new review");
      res.status(500).send("Unable to insert new review");
      return

    }
    res.json(review);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(JSON.stringify(error));

  }
});



// GET - returns the all review  by id 
router.get('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviews = await knex('review').where({ id: reviewId });
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