import React from "react";
import './SearchBar.css';


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    let searchTerm = document.querySelector(".SearchBar input").value;
    this.props.onSearch(searchTerm);
  }

  render() {
    return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" />
      <button className="SearchButton" onClick={this.handleSearch}>SEARCH</button>
    </div>
    );
  }
}