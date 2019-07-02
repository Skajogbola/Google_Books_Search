import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data)
         this.setState({
          savedBooks: res.data
        })
        
      }
      )
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

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
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books">
              {this.state.savedBooks.length !== 0 ? (
                <List>
                  {this.state.savedBooks.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">No Saved Books</h2>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
