import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooksBar from './SearchBooksBar'
import SearchBooksResult from './SearchBooksResult'
import { Route, Switch } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {

    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    searchResultList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.map( (book) => {
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
        return null
      })
    })
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

        <Switch>
          <Route exact path='/' render={() => (
            <ListBooks
              currentlyReadingList={currentlyReadingList}
              wantToReadList={wantToReadList}
              readList={readList}
              updateSelectedBook={this.updateSelectedBook}
            />
          )}/>

          <Route path='/search' render={() => (
            <div className="search-books">

              <SearchBooksBar
                updateSearchResultList={this.updateSearchResultList}
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
          )}/>
        </Switch>

      </div>
    )
  }
}

export default BooksApp
