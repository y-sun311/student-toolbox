import React, { useState, useEffect } from "react";
import "./styles/TodoCreateModal.css";
import PropTypes from "prop-types";

export default function TodoCreateModal({ showing, onClose, onCreate }) {
  TodoCreateModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [closeButtonText, setCloseButtonText] = useState("Close");

  useEffect(() => {
    const handleResize = () => {
      // If the window is less than 800px wide, change the close button text to a close icon
      if (window.innerWidth <= 800) {
        setCloseButtonText("×");
      } else {
        setCloseButtonText("Close");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const modalVisible = {
    visibility: showing ? "visible" : "hidden",
    opacity: showing ? "1" : "0",
    scale: showing ? "1" : "0.95",
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (title && description) {
      onCreate(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div id="todo-create-modal" style={modalVisible}>
      <div className="title-bar">
        <h1>Create New Todo Item</h1>
        <button id="todo-create-modal-close-button" onClick={onClose}>
          {closeButtonText}
        </button>
      </div>

      <form id="todo-create-modal-form" onSubmit={handleCreate}>
        <label>
          Title
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button id="todo-create-modal-create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}