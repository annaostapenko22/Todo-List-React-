import React, { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItems extends Component {
  //   constructor() {
  //     super()
  // this.state = {
  //   done: false
  // }
  // }
  // state = {
  //   done: false,
  //   important: false
  // };
  onLabelClick = () => {
    // console.log("done", this.props.label);

    this.setState(({ done }) => {
      return {
        done: !done
      };
    });
  };
  handleImportance = () => {
    this.setState(state => {
      return {
        important: !this.state.important
      };
    });
  };

  render() {
    const {
      label,
      onDeleted,
      onToggleDone,
      onToggleImportant,
      done,
      important
    } = this.props;
    let classNames = "todo-list-item";
    if (done) {
      classNames += " done";
    }
    if (important) {
      classNames += " important";
    }
    return (
      <span>
        <span className={classNames} onClick={onToggleDone}>
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </span>
    );
  }
}
