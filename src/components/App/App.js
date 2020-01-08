import React, { Component } from "react";
import TodoList from "../TodoList/TodoList";
import AppHeader from "../AppHeader/AppHeader";
import SearchPanel from "../SearchPanel/SearchPanel";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import "./App.css";
import ItemAddForm from "../ItemAddForm/ItemAddForm";
const getItem = JSON.parse(localStorage.getItem("data"));
export default class App extends Component {
  maxId = 101;
  state = {
    todoData: getItem ? getItem : [],
    filter: "all",
    search: ""
  };
  componentDidMount() {
    localStorage.setItem("data", JSON.stringify(this.state.todoData));
  }
  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify(this.state.todoData));
  }

  addItem = text => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newObject = [...todoData, newItem];
      return {
        todoData: newObject
      };
    });
    localStorage.setItem("data", JSON.stringify(this.state.todoData));
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }
  deletItem = id => {
    this.setState(({ todoData }) => {
      const newObj = todoData.filter(elem => elem.id !== id);
      return {
        todoData: newObj
      };
    });
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(elem => elem.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(elem => elem.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArr
      };
    });
  };

  setSearchState = value => {
    this.setState({ search: value.toLowerCase() });
  };

  setFilterState = state => {
    this.setState({ filter: state });
  };
  filterItems = (search, filter, todoData) => {
    let todoList = [...todoData];
    if (filter === "done") {
      todoList = todoList.filter(elem => {
        return elem.done;
      });
    } else if (filter === "todo") {
      todoList = todoList.filter(elem => !elem.done);
    }
    if (search) {
      todoList = todoList.filter(elem =>
        elem.label.toLowerCase().includes(search)
      );
    }
    return todoList;
  };

  filterActiveItems = () => {
    this.setState(({ todoData }) => {
      const newObj = todoData.filter(elem => !elem.done);
      return {
        todoData: newObj
      };
    });
  };

  filterAllItems = () => {
    this.setState({ todoData: this.state.todoData });
  };

  filterDoneItems = () => {
    this.setState(({ todoData }) => {
      const newObj = todoData.filter(elem => elem.done);
      return {
        todoData: newObj
      };
    });
  };

  render() {
    const { todoData, search, filter } = this.state;
    const filteredItems = this.filterItems(search, filter, todoData);
    const doneCount = todoData.filter(elem => elem.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="container">
        <AppHeader toDo={todoCount} done={doneCount} />
        <SearchPanel onHandleFilter={this.setSearchState} />
        <ItemStatusFilter changeFilterState={this.setFilterState} />
        <TodoList
          todos={filteredItems}
          onDeleted={this.deletItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
