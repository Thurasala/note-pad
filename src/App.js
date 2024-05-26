import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faImage,
  faThumbtack,
  faUserPlus,
  faPalette,
  faEllipsisVertical,
  faRotateLeft,
  faRotateRight,
  faPaintbrush,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      title: '',
      items: [],
      toggleInputs: true,
      editIndex: null, // New state to track the note being edited
    };
  }

  toggleInputHandler = () => {
    this.setState({ toggleInputs: false });
  }

  inputChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addItemHandler = () => {
    const { notes, items, title, editIndex } = this.state;
    if (notes.trim() && title.trim()) {
      if (editIndex !== null) {
        // Edit existing note
        const updatedItems = items.map((item, index) =>
          index === editIndex ? { notes, title } : item
        );
        this.setState({
          items: updatedItems,
          notes: '',
          title: '',
          toggleInputs: true,
          editIndex: null,
        });
      } else {
        // Add new note
        const newItem = { notes, title };
        this.setState({
          items: [...items, newItem],
          notes: '',
          title: '',
          toggleInputs: true,
        });
      }
    } else {
      alert("Title or Note Can't be empty");
    }
  };

  editItemHandler = (index) => {
    const { items } = this.state;
    this.setState({
      notes: items[index].notes,
      title: items[index].title,
      toggleInputs: false,
      editIndex: index,
    });
  }

  deleteItemHandler = (index) => {
    const { items } = this.state;
    const updatedItems = items.filter((item, i) => i !== index);
    this.setState({ items: updatedItems });
  }

  render() {
    const { notes, title, toggleInputs, items, editIndex } = this.state;
    return (
      <div className="all-container">
        <div className="todo-list">
          {toggleInputs ? (
            <div className="form">
              <div className="container">
                <input
                  type="text"
                  name="notes"
                  placeholder="Take a Note.."
                  onClick={this.toggleInputHandler}
                />
                <div className="images">
                  <FontAwesomeIcon className='icon' icon={faSquareCheck} />
                  <FontAwesomeIcon className="icon" icon={faPaintbrush} />
                  <FontAwesomeIcon className="icon" icon={faImage} />
                </div>
              </div>
            </div>
          ) : (
            <div className="form">
              <div className="container">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.inputChangeHandler}
                />
                <FontAwesomeIcon icon={faThumbtack} />
              </div>
              <textarea
                type="text"
                name="notes"
                placeholder="Take a Note .."
                value={notes}
                rows={1}
                cols={30}
                onChange={this.inputChangeHandler}
              />
              <div className="all-options">
                <div className="extra-options">
                  <FontAwesomeIcon className="icon" icon={faBell} />
                  <FontAwesomeIcon className="icon" icon={faUserPlus} />
                  <FontAwesomeIcon className="icon" icon={faPalette} />
                  <FontAwesomeIcon className="icon" icon={faImage} />
                  <FontAwesomeIcon className="icon" icon={faEllipsisVertical} />
                  <FontAwesomeIcon className="icon" icon={faRotateLeft} />
                  <FontAwesomeIcon className="icon" icon={faRotateRight} />
                </div>
                <button className="close-btn" onClick={this.addItemHandler}>
                  {editIndex !== null ? 'Update' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="all-items">
          {items.map((item, index) => (
            <div className='items' key={index}>
              <div className='content'>
                <strong>{item.title}</strong>
                <p>{item.notes}</p>
              </div>
              <div className="extra-items-hover">
                <FontAwesomeIcon className="icon" icon={faBell} />
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <FontAwesomeIcon className="icon" icon={faPalette} />
                <FontAwesomeIcon className="icon" icon={faImage} />
                <div className="drop-down">
                  <FontAwesomeIcon className="icon" icon={faEllipsisVertical} />
                  <div className="drop-down-option">
                    <div className='option' onClick={() => this.editItemHandler(index)}>Edit Note</div>
                    <div className='option' onClick={() => this.deleteItemHandler(index)}>Delete Note</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App;

