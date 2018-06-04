import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EachBook from './EachBook'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

  static propTypes = {
    currentlyReadingList: PropTypes.array.isRequired,
    wantToReadList: PropTypes.array.isRequired,
    readList: PropTypes.array.isRequired,
    updateSelectedBook: PropTypes.func.isRequired
  }


  render() {
    const { currentlyReadingList, wantToReadList, readList, updateSelectedBook } = this.props

    const currentlyReadingListElement = currentlyReadingList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={updateSelectedBook}
        />
      )
    })

    const wantToReadListElement = wantToReadList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={updateSelectedBook}
        />
      )
    })

    const readListElement = readList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={updateSelectedBook}
        />
      )
    })

    return (
      <div>
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReadingListElement}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToReadListElement}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {readListElement}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="open-search">

          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>

    )
  }
}

export default ListBooks
