import React, { useEffect, useState } from 'react'
import "./style.css"



// to get the data from localhost
const getLocalData = () => {
    const list = localStorage.getItem("mytodoList");
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setinputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);

    // To add items in the list
    const addItem = () => {
        if (!inputData)
            alert("Please fill the data");
        else if (toggleButton && inputData) {
            setItems(
                items.map((currElement) => {
                    if (currElement.id === isEditItem)
                        return { ...currElement, name: inputData }
                    else
                        return currElement;
                })
            )
            settoggleButton(false);
            setinputData("");
            setisEditItem("");
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]);
            setinputData("");
        }
    }

    // To delete item from list
    const deleteItem = ((id) => {
        const updatedItem = items.filter((currElement) => {
            return currElement.id !== id;
        })
        setItems(updatedItem);
    })



    // To remove all the list items
    const removeAll = () => {
        setItems([]);
    }


    // to edit/update the todo item
    const editItem = (id) => {
        const item_edit = items.find((currElement) => {
            return currElement.id === id;
        })
        setinputData(item_edit.name);
        setisEditItem(id);
        settoggleButton(true);
    }

    // to store the data in localhost
    useEffect(() => {
        localStorage.setItem("mytodoList", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.jpg" alt="todo_logo"></img>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Item' className='form-control' value={inputData} onChange={(event) => setinputData(event.target.value)}>
                        </input>
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}

                    </div>
                    {items.map((currElement) => {
                        return (
                            <div className="showItems" key={currElement.id}>
                                <div className="eachItem">
                                    <h3>{currElement.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(currElement.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElement.id)}></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECKLIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo