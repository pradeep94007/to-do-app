import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("mytodo");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [idPass, setIdPass] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  const addItems = () => {
    if (!inputData) {
      alert("Please fill in the data");
    } else {
      if (toggleBtn) {
        setItems(
          items.map((item) =>
            item.id === idPass ? { ...item, name: inputData } : item
          )
        );
        setInputData("");
        setIdPass("");
        setToggleBtn(false);
      } else {
        const myInpData = {
          id: new Date().getTime().toString(),
          name: inputData,
          completed: false,
        };
        setItems([...items, myInpData]);
        setInputData("");
      }
    }
  };

  const removeAll = () => {
    setItems([]);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((curEle) => {
      return curEle.id !== id;
    });
    setItems(updatedItems);
  };

  const toggleCompleted = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(items));
  }, [items]);

  const editItem = (id) => {
    const itemToEdit = items.find((curEle) => curEle.id === id);
    setInputData(itemToEdit.name);
    setIdPass(id);
    setToggleBtn(true);
  };

  return (
    <div className="main">
      <div>
        <h1>To-do list</h1>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button onClick={addItems}>
          {toggleBtn ? (
            <i className="fa-regular fa-pen-to-square"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </button>
      </div>

      {items.map((curEle) => {
        return (
          <div key={curEle.id} style={{ display: "flex", marginTop: "20px" }}>
            <input
              type="checkbox"
              checked={curEle.completed}
              onChange={() => toggleCompleted(curEle.id)}
            />
            <div className="child-1">
              <h5 style={{ textDecoration: curEle.completed ? "line-through" : "none" }}>
                {curEle.name}
              </h5>
            </div>
            <button onClick={() => deleteItem(curEle.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={() => editItem(curEle.id)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        );
      })}

      <button className="btn btn-danger mt-2" onClick={removeAll}>
        Remove all
      </button>
    </div>
  );
}

export default Todo;
