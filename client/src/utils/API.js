import axios from "axios";

export default {
  // Gets all books from the Google API
  getBooks: function (q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Gets all books
  getSavedBooks: function () {
    return axios.get(process.env.NODE_ENV === "production" ? "/api/books" : "http://localhost:3001/api/books"  );
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // // Gets all saved books as JSON
  // getSavedBooks: function () {
  //   return axios.get("/api/books/");
  // },
  // Deletes a book from the database with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a new book to the database
  saveBook: function (savedBooks) {
    return axios.post("/api/books", savedBooks);
  }
};
