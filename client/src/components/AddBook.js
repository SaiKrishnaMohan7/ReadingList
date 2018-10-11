import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAllAuthors } from './../queries/queries';

class AddBook extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  };

  displayAuthors(){
    let data = this.props.data;

    if (data.loading){
      return (<option disabled>Loading...</option>);
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>);
      });
    }
  }

  bookNameChangeHandler(e) {
    this.setState({name: e.target.value});
  }

  bookGenreChangeHandler(e) {
    this.setState({genre: e.target.value});
  }

  bookAuthorChangeHandler(e){
    this.setState({authorId: e.target.value})
  }

  formSubmitionHandler(e){
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.formSubmitionHandler.bind(this)}>
        <div className="field">
            <label>Book name:</label>
            <input type="text"
              onChange={this.bookNameChangeHandler.bind(this)}
            />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text"
              onChange={this.bookGenreChangeHandler.bind(this)}
            />
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={this.bookAuthorChangeHandler.bind(this)}>
                <option>Select author</option>
                { this.displayAuthors() }
            </select>
        </div>
        <button>+</button>

            </form>
    );
  }
}

export default graphql(getAllAuthors)(AddBook);
