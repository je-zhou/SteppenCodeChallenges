import React from 'react'

// Left Pane of TwoPaneList
// Displays the available titles and ability to select which title to show content

// @param {string} selectedTitle
// @param {string[]} titles
// @param {() => void} onClick

export default function LeftPane({selectedTitle, titles, onClick}) {
  return (
    <div class="is-flex-direction-column">
      {titles.map((title) => 
        <div 
          key={title}
          onClick={() => onClick(title)} 
          class={`notification is-clickable m-2 ${selectedTitle === title ? "is-primary": ""}`}
        >
          {title}
        </div>
      )}
    </div>
  )
}
