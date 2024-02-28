import {useState, useEffect} from 'react';
import ItemTile from './ItemTile';

// Item List
// A list of text items for add, edit and delete functions

export const ItemList = () => {
  // items: string[]
  const [items, setItems] = useState([]); 
  // errorMsg: string || null
  const [errorMsg, setErrorMsg] = useState(null);

  // Add Font Awesome Icon Script
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", 'https://kit.fontawesome.com/43f896f35d.js');
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  });

  function onAdd() {
    const inputElement = document.getElementById('newItem');

    if (inputElement) {
      const newItem = inputElement.value;

      // Check for empty string
      if (newItem === "") {
        setErrorMsg("Please enter a non-empty string");
        return;
      }
      // TODO:: Add additional checks if needed in the future

      setItems([...items, newItem]);

      inputElement.value = "";
      setErrorMsg(null);
    }
  }

  function onUpdate(newItem, index) {
    const newList = [...items];
    newList[index] = newItem;
    setItems(newList);
  }
  
  function onDelete(index) {
    setItems(items.toSpliced(index, 1));
  }

  return <div>
    {/* Item Tiles */}
    {items.map((item, index) => 
      <ItemTile
        key={item+index}
        item={item}
        index={index}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />)
    }
    {/* Add Item Text Field */}
    <div class="field mt-5">
      <label class="label">New Item</label>
      <div class="control">
        <input 
          id='newItem' 
          class="input" 
          type="text" 
          placeholder="Item"
          onKeyDown={event => {
            if (event.key === 'Enter') {
              onAdd()
            }
          }}  
        />
      </div>
    </div>
    {/* Add Button */}
    <div class="control">
      <div onClick={() => onAdd()} class="button is-primary">Add</div>
    </div>
    {/* Error Message */}
    {errorMsg && 
      <div class="tag is-danger is-medium mt-4">
        <p>{errorMsg}</p>
      </div>
    }

  </div>
}
