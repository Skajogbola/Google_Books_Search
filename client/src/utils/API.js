import axios from "axios";

export default {
  // Gets all books from the Google API
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // Gets all saved books as JSON
  getSavedBooks: function() {
    return axios.get("/api/books/");
  },
  // Deletes a book from the database with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a new book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
