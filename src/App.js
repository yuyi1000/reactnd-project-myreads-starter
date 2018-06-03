import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResult from './SearchBooksResult'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    searchResultList: []
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

  hideSearchPage = () => {
    this.setState({ showSearchPage: false })
  }

  clearSearchResultList = () => {
    this.setState({ searchResultList: [] })
  }

  updateSearchResultList = (query) => {
    if (!query) {
      this.clearSearchResultList()
    }
    else {
      BooksAPI.search(query).then((books) => {
        // console.log('updateSearchResultList')
        // console.log(books)
        if (books.error === 'empty query') {
          this.clearSearchResultList()
        } else {
          this.setState({searchResultList: books})
        }
      })
    }
  }

  updateSelectedBook = (newShelf, book) => {
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

    const { currentlyReadingList, wantToReadList, readList, searchResultList } = this.state

    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">

            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <SearchBooksBar
              updateSearchResultList={this.updateSearchResultList}
              hideSearchPage={this.hideSearchPage}
              clearSearchResultList={this.clearSearchResultList}
            />

            <SearchBooksResult
              currentlyReadingList={currentlyReadingList}
              wantToReadList={wantToReadList}
              readList={readList}
              searchResultList={searchResultList}
              updateSelectedBook={this.updateSelectedBook}
            />
          </div>
        ) : (
          <div>
            <div>
              <ListBooks
                currentlyReadingList={currentlyReadingList}
                wantToReadList={wantToReadList}
                readList={readList}
                updateSelectedBook={this.updateSelectedBook}
              />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
