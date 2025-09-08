import express from 'express';
import {z}from 'zod';
import reviewer from './routes/reviews';// Import reviews router



// Interface
interface MovieType {
  id: number;
  title: string;      
  releaseYear: number; 
  imageUrl: string;    
}
const MoviesSchema = z.object({
	  id: z.number(),
	  title: z.string(),
	  releaseYear: z.number(),
	  imageUrl: z.string()
});

// Movies array
const moviesData: MovieType[] = [
  {
    id: 1,
    title: "My Neighbor Totoro",
    releaseYear: 1988,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg",
  },
  {
    id: 2,
    title: "Spirited Away",
    releaseYear: 2001,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.JPG",
  },
  {
    id: 3,
    title: "Princess Mononoke",
    releaseYear: 1997,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/24/Princess_Mononoke_Japanese_poster.png",
  },
  {
    id: 4,
    title: "Howl's Moving Castle",
    releaseYear: 2004,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg",
  },
  {
    id: 5,
    title: "Ponyo",
    releaseYear: 2008,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9d/Ponyo_%282008%29.png",
  },
];

// Express server
const app = express();
app.use(express.json());

// GET /movies
app.get('/movies', (req, res) => {
  console.log("data get successfully");
  res.status(200).json(moviesData);
});

// POST new Movie

app.post("/movies", (req, res) => {// Add new movie
  const movieResult = MoviesSchema.safeParse(req.body);// Validate input data

  if (!movieResult.success) {// Validation failed
    return res.status(400).json({ message: "Invalid movie data" });
  }

  // Validated data
  const { id, title, releaseYear, imageUrl } = movieResult.data;

  const newMovie: MovieType = { id, title, releaseYear, imageUrl };// Create new movie object
  moviesData.push(newMovie);// Add to movies array

  res.status(201).json(newMovie);// Respond with the new movie
});

//DELETE movie
app.delete('/movies/:id', (req, res) => {// Delete movie by ID
	const Id=Number(req.params.id);// Get ID from URL
	const movieIndex=moviesData.findIndex(movie=>movie.id===Id);// Find movie index
	const deleteResult=moviesData.splice(movieIndex,1)[0];// Remove movie from array
	res.status(200).json(deleteResult);// Respond with deleted movie
});

// PUT movie
app.put('/movies/:id', (req, res) => { // Update movie by ID
  const index = moviesData.findIndex(movie => movie.id === Number(req.params.id)); // Find movie index

 const { id, title, releaseYear, imageUrl } = req.body; // Get updated data from request body

  const updatedMovie: MovieType = {
    id,
    title,
    releaseYear,
    imageUrl
  }; // Create updated movie object

  moviesData[index] = updatedMovie; // Update movie in array
  res.status(200).json(updatedMovie); // Respond with updated movie
});

//PATCH movie
app.patch('/movies/:id', (req, res) => {
	const id=Number(req.params.id);// Get ID from URL
	  const index = moviesData.findIndex(movie => movie.id === Number(req.params.id)); // Find movie index
	  const existingMovie=moviesData[index];// Get existing movie
	  const updatedMovie={...existingMovie,...req.body};// Merge existing movie with updated data
	  moviesData[index]=updatedMovie;
	  res.status(200).json(updatedMovie);// Respond with updated movie
 }); 

 app.use('/reviews', reviewer);// Use reviews router for /reviews endpoint
// Start server 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});