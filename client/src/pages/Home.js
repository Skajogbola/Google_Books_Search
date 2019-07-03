import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  }

  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res => {
        if (res.data.items === "error") {
          throw new Error(res.data.items);
        }
        else {
          // store response in a array
          let results = res.data
          console.log(results)
          //map through the array 
          let newResults = results.map(result => {
            //store each book information in a new object 
            result = {
              key: result.id,
              id: result.id,
              title: result.volumeInfo.title,
              author: result.volumeInfo.authors,
              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink
            }
            return result;
          })
          // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
          this.setState({ books: results, error: "" })
        }
      })
      .catch(() =>
        this.setState({
          books: [],
          message: "Sorry, No New Books Found. Try a Different Query"
        })
      );
  };

  handleBookSave = event => {
    // console.log(event)
    // event.preventDefault();
    // console.log('hiiii', this.state.books)
    let savedBooks = this.state.books.filter(book => book.id === event)
    savedBooks = savedBooks[0];
    const bookToSave = savedBooks.volumeInfo;
    bookToSave.link = bookToSave.infoLink;
    bookToSave.googleId = savedBooks.id;
    bookToSave.title = savedBooks.volumeInfo.title;
    bookToSave.subtitle = savedBooks.volumeInfo.subtitle;
    bookToSave.author = typeof savedBooks.volumeInfo.authors === 'object' && savedBooks.volumeInfo.authors.length ? savedBooks.volumeInfo.authors.join(", ") : '';
    bookToSave.description = savedBooks.volumeInfo.description;
    bookToSave.image = savedBooks.volumeInfo.imageLinks.thumbnail;
    API.saveBook(bookToSave)
      .then(this.setState({ message: alert("Your book is saved") }))
      .catch(err => console.log(err))
  }

  // handleBookSave = id => {
  //   const book = this.state.books.find(book => book.id === id);

  //   API.saveBook({
  //     googleId: book.id,
  //     title: book.volumeInfo.title,
  //     subtitle: book.volumeInfo.subtitle,
  //     link: book.volumeInfo.infoLink,
  //     authors: book.volumeInfo.authors,
  //     description: book.volumeInfo.description,
  //     image: book.volumeInfo.imageLinks.thumbnail
  //   }).then(() => this.getSavedBooks());
  // };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center text-white">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center text-white">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      // authors={book.volumeInfo.authors}
                      authors={typeof book.volumeInfo.authors === 'object' && book.volumeInfo.authors.length ? book.volumeInfo.authors : ''}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
