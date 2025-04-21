const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;
    //TODO: ADD CODE to Filter books by genre.
    try{
    if (genre) {
      const filteredBooks = books.filter((book) => book.genre.includes(genre));
      res.send(filteredBooks);
    } else {
      res.send(books);
    }
  }catch(error){
    next(error);
  }
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBook = books.find(
          (b) => b.id === parseInt(req.params.id, 10)
        );
        if (foundBook) {
          resolve(foundBook);
        } else {
          //TODO: ADD CODE to reject the promise
          reject(new Error("Not found"));
        }
      }, 1000); // Simulate a 1-second delay
    });
    //TODO: ADD CODE
    res.send(book);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

//TODO: ADD CODE
app.use((err, req, res, next) => {
  const status = err.status;
  const response = {
    message: err.message,
    status: status,
  };

  console.error(err.stack);
  res.status(status).json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
