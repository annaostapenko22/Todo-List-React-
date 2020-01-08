import React, { Component } from "react";
import "./ItemStatusFilter.css";
export default class ItemStatusFilter extends Component {
  classNames = "btn btn-outline-secondary";
  onClickActive = () => {
    this.props.changeFilterState("todo");
  };
  onClickAll = () => {
    this.props.changeFilterState("all");
  };
  onClickDone = () => {
    this.props.changeFilterState("done");
  };
  render() {
    let classNames = "btn btn-info";

    return (
      <div className="btn-group">
        <button type="button" className={classNames} onClick={this.onClickAll}>
          All
        </button>
        <button
          type="button"
          className={classNames}
          onClick={this.onClickActive}
        >
          Active
        </button>
        <button type="button" className={classNames} onClick={this.onClickDone}>
          Done
        </button>
      </div>
    );
  }
}
