import express from "express";

// Interface for Reviews
interface ReviewType {
  id: number;
  movieId: number; 
  reviewer: string; 
  rating: number; 
}

// 10 person for testing)
const reviewsData: ReviewType[] = [
  { id: 1, movieId: 1, reviewer: "Saghi", rating: 5 },
  { id: 2, movieId: 1, reviewer: "Snowy", rating: 4 },
  { id: 3, movieId: 2, reviewer: "Adriana", rating: 5 },
  { id: 4, movieId: 2, reviewer: "Delvin", rating: 3 },
  { id: 5, movieId: 3, reviewer: "Parya", rating: 4 },
  { id: 6, movieId: 3, reviewer: "Amir", rating: 5 },
  { id: 7, movieId: 4, reviewer: "Elham", rating: 2 },
  { id: 8, movieId: 4, reviewer: "Finix", rating: 3 },
  { id: 9, movieId: 5, reviewer: "Mehri", rating: 4 },
  { id: 10, movieId: 5, reviewer: "Malahat", rating: 5 },
];

const router = express.Router();

// GET all reviews
router.get("/", (req,res) => {
  res.status(200).json(reviewsData);
});

// POST new review
router.post("/", (req, res) => {
  const { id, movieId, reviewer, rating } = req.body;
  const newReview: ReviewType = { id, movieId, reviewer, rating };
  reviewsData.push(newReview);
  res.status(201).json(newReview);
});

export default router;
