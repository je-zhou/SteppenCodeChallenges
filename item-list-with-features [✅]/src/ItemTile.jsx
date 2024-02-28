import React, {useState} from 'react'
import "./ItemTile.css"

// Item Tiles as a sub component for ItemList.tsx
// The list tiles shown after an item is added
// When hover overed, two buttons appear on the left - a delete and an edit button
// Delete button prompts a modal to appear for confirmation and then removes the item from list
// Edit turns button back into a text field, when updated, component is changed back to a list item

export default function ItemTile({item, index, onUpdate, onDelete}) {
  // modalOpen: boolean
  const [modalOpen, setModalOpen] = useState(false);
  // isEditing: boolean
  const [isEditing, setIsEditing] = useState(false);
  // errorMsg: string || null
  const [errorMsg, setErrorMsg] = useState(null);

  function onConfirm() {
    setModalOpen(false);
    onDelete(index);
  }

  function onEditSave() {
    const updateElement = document.getElementById(`index_${index}_edit`);

    if (updateElement) {
      const newItem = updateElement.value;

      // Check for empty string
      if (newItem === "") {
        setErrorMsg("Please enter a non-empty string");
        return;
      }
      // TODO:: Add additional checks if needed in the future

      if (newItem !== item) onUpdate(newItem, index);
      setErrorMsg(null);
      setIsEditing(false);
    }
  }

  return (
    <>
      <div class="is-flex is-align-items-center mt-4 translateRightParent" >
        {
          isEditing ? 
          // Save Edit Button
          <button class="button mr-2" onClick={() => onEditSave()}>
            <span class="icon">
              <i class="fa-solid fa-check"></i>
            </span>
            <span>Save</span>
          </button> : 
          // Delete & Edit Buttons
          <div>
            <button class="button mr-2" onClick={() => setModalOpen(true)}>
              <span class="icon is-small">
                <i class="fa-solid fa-trash"></i>
              </span>
            </button>
            <button class="button mr-2" onClick={() => setIsEditing(true)}>
              <span class="icon is-small">
                <i class="fa-regular fa-pen-to-square"></i>
              </span>
            </button>
          </div>
        }
        {/* Item Tile */}
        <div class={`notification is-flex-grow-1 ${isEditing ? "" : "translateRightChild"}`}>
          {isEditing ?  
            // Edit Input
            <div>
              <input 
                id={`index_${index}_edit`}
                class="input" 
                type="text" 
                placeholder="Item"
                defaultValue={item}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    onEditSave();
                  }
                }}  
              />
              {/* Error Message */}
              {errorMsg && 
                <div class="tag is-danger is-medium">
                  <p>{errorMsg}</p>
                </div>
              }
            </div>
            // Item Text
            : <p class="p-2">{item}</p>
          }
        </div>
      </div>
      {/* Modal */}
      <div id="delete-modal" class={`modal ${modalOpen ? "is-active" : ""}`}>
        <div class="modal-background" onClick={() => setModalOpen(false)}></div>
        <div class="modal-content">
          <article class="message is-medium">
            <div class="message-header">
              <p>{`Delete Item: ${item}`}</p>
              <button class="delete" aria-label="delete" onClick={() => setModalOpen(false)}></button>
            </div>
            <div class="message-body">
              <p>Are you sure you want to delete this item?</p>
              <p>This action <strong>cannot</strong> be undone.</p>
              <div class="buttons mt-4">
                <button class="button is-danger" onClick={() => onConfirm()}>Confirm</button>
                <button class="button" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
