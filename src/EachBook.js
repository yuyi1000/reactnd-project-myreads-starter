import React, { Component } from 'react';
import PropTypes from 'prop-types'

class EachBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateSelectedBook: PropTypes.func.isRequired
  }

  state = {
    shelf: ''
  }

  componentDidMount() {
    this.setState({shelf: this.props.book.shelf})
  }

  updateShelf = (newShelf) => {
    this.setState({shelf: newShelf})
  }

  render() {
    const { book, updateSelectedBook } = this.props
    const { shelf } = this.state

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: '100%', height: '100%', backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={(event) => {updateSelectedBook(event.target.value, book); this.updateShelf(event.target.value)}}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors[0]}</div>
        </div>
      </li>
    )
  }
}

export default EachBook
