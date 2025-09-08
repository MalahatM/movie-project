import express from "express";
import { z } from "zod";


// Interface for Reviews
interface ReviewType {
  id: number;
  movieId: number; 
  reviewer: string; 
  rating: number; 
}
const ReviewSchema = z.object({// Validation schema
  id: z.number(),
  movieId: z.number(),
  reviewer: z.string(),
  rating: z.number(),
});


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

const router = express.Router();// Create router

// GET all reviews
router.get("/", (req, res) => {
  res.status(200).json(reviewsData);
});

// POST new review with Zod validation
router.post("/", (req, res) => {
  const parsed = ReviewSchema.safeParse(req.body);// Validate input
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid review data" });// Validation failed
  }

  const newReview: ReviewType = parsed.data;//validated data
  reviewsData.push(newReview);// Add to array
  res.status(201).json(newReview);// Respond with new review
});

// DELETE review by ID
router.delete("/:id", (req, res) => {// Delete review by ID
  const id = Number(req.params.id);// Get ID from URL
  const index = reviewsData.findIndex((review) => review.id === id);// Find review index

  const deletedReview = reviewsData.splice(index, 1)[0];// Remove review from array 
  res.status(200).json(deletedReview);// Respond with deleted review
});


export default router;
