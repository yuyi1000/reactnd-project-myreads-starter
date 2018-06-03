import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EachBook from './EachBook'

class SearchBooksResult extends Component {
  static propTypes = {
    searchResultList: PropTypes.array.isRequired,
    currentlyReadingList: PropTypes.array.isRequired,
    wantToReadList: PropTypes.array.isRequired,
    readList: PropTypes.array.isRequired,
    updateSelectedBook: PropTypes.func.isRequired
  }

  render() {
    const { currentlyReadingList, wantToReadList, readList, searchResultList, updateSelectedBook } = this.props
    const searchResultListElement = searchResultList.map((book) => {
      if (currentlyReadingList.filter(b => b.id === book.id).length > 0) {
        book.shelf = 'currentlyReading'
      }
      if (wantToReadList.filter(b => b.id === book.id).length > 0) {
        book.shelf = 'wantToRead'
      }
      if (readList.filter(b => b.id === book.id).length > 0) {
        book.shelf = 'read'
      }
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={updateSelectedBook}
        />
      )
    })

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResultListElement}
        </ol>
      </div>
    )
  }
}

export default SearchBooksResult
