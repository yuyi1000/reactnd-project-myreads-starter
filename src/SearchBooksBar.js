import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBooksBar extends Component {
  static propTypes = {
    updateSearchResultList: PropTypes.func.isRequired,
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
    const { updateSearchResultList, clearSearchResultList } = this.props

    return (
      <div className="search-books-bar">
        <Link className="close-search" to='/' onClick={() => {this.clearQuery(); clearSearchResultList()}}>Close</Link>
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
