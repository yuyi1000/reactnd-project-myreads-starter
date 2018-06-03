import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBooksBar extends Component {
  static propTypes = {
    updateSearchResultList: PropTypes.func.isRequired,
    hideSearchPage: PropTypes.func.isRequired,
    clearSearchResultList: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { query } = this.state
    const { updateSearchResultList, hideSearchPage, clearSearchResultList } = this.props

    return (
      <div className="search-books-bar">
        <a className="close-search" onClick={() => {this.clearQuery(); hideSearchPage(); clearSearchResultList()}}>Close</a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {this.updateQuery(event.target.value); updateSearchResultList(event.target.value)}}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooksBar
