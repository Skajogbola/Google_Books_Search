const axios = require("axios");
const db = require("../models");

// findAll searches the Google Books API and returns only the entries we haven't already saved

module.exports = {
  findAll: function (req, res) {

    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results => {
        let books = results.data.items
        console.log(books)
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
        console.log(books);
        res.json(books)
      }
      )
      .catch(err => res.status(422).json(err));
  }
};