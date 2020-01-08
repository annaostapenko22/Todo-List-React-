import React, { Component } from "react";
import "./ItemAddForm.css";
export default class ItemAddForm extends Component {
  state = {
    label: ""
  };
  onLabelChange = evt => {
    const enteredValue = evt.target.value;
    this.setState({ label: enteredValue });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: "" });
  };
  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What's new item to do?"
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}
