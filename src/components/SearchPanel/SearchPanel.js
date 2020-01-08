import React, { Component } from "react";
import "./SearchPanel.css";
export default class SearchPanel extends Component {
  state = {
    value: ""
  };

  onChange = evt => {
    const getValue = evt.target.value;
    this.props.onHandleFilter(getValue);
  };
  render() {
    const searchText = "Type here to search";
    return (
      <input
        className="form-control search-panel"
        placeholder={searchText}
        onChange={this.onChange}
      />
    );
  }
}
