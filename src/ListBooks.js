import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import EachBook from './EachBook'

class ListBooks extends Component {

  state = {
    currentlyReadingList: [],
    wantToReadList: [],
    readList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // console.log(books)
      books.map( (book) => {
        // console.log(book)
        let shelf = book.shelf
        if (shelf === 'currentlyReading') {
          this.setState((prevState) => {
            let currentlyReadingList = prevState.currentlyReadingList.slice()
            currentlyReadingList.push(book)
            return {currentlyReadingList: currentlyReadingList}
          })
        }
        else if (shelf === 'wantToRead') {
          this.setState((prevState) => {
            let wantToReadList = prevState.wantToReadList.slice()
            wantToReadList.push(book)
            return {wantToReadList: wantToReadList}
          })
        }
        else if (shelf === 'read') {
          this.setState((prevState) => {
            let readList = prevState.readList
            readList.push(book)
            return {readList: readList}
          })
        }
      })
    })
  }

  updateSelectedBook = (newShelf, book) => {
    console.log(newShelf)
    console.log(book)
    if (book.shelf !== newShelf) {
      const prevShelf = book.shelf
      if (prevShelf === 'currentlyReading') {
        this.setState((prevState) => ({
          currentlyReadingList: prevState.currentlyReadingList.filter((b) => b.id !== book.id)
        }))
      }
      if (prevShelf === 'wantToRead') {
        this.setState((prevState) => ({
          wantToReadList: prevState.wantToReadList.filter((b) => b.id !== book.id)
        }))
      }
      if (prevShelf === 'read') {
        this.setState((prevState) => ({
          readList: prevState.readList.filter((b) => b.id !== book.id)
        }))
      }

      BooksAPI.update(book, newShelf)

      book.shelf = newShelf
      if (newShelf === 'currentlyReading') {
        this.setState((prevState) => {
          let currentlyReadingList = prevState.currentlyReadingList.slice()
          currentlyReadingList.push(book)
          return {currentlyReadingList: currentlyReadingList}
        })
      }
      if (newShelf === 'wantToRead') {
        this.setState((prevState) => {
          let wantToReadList = prevState.wantToReadList.slice()
          wantToReadList.push(book)
          return {wantToReadList: wantToReadList}
        })
      }
      if (newShelf === 'read') {
        this.setState((prevState) => {
          let readList = prevState.readList.slice()
          readList.push(book)
          return {readList: readList}
        })
      }


    }
  }

  render() {
    const {currentlyReadingList, wantToReadList, readList} = this.state

    const currentlyReadingListElement = currentlyReadingList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={this.updateSelectedBook}
        />
      )
    })

    const wantToReadListElement = wantToReadList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={this.updateSelectedBook}
        />
      )
    })

    const readListElement = readList.map((book) => {
      return (
        <EachBook key={book.id}
          book={book}
          updateSelectedBook={this.updateSelectedBook}
        />
      )
    })

    return (
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
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
