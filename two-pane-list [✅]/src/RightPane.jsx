import React from 'react'

// Right Pane of TwoPaneList
// Displays the content relevant to the selected title

// @param {Object} data
// @param {string} selectedTitle
// @param {() => void} onClick

// data: {
//   title: string,
//   content: string[]
// }[]
// title: string


export default function RightPane({data, selectedTitle}) {

  const selectedObj = data.find((obj) => obj.title === selectedTitle);

  // Handle outside error
  if (!selectedObj && selectedTitle) return <div>Error!</div>

  return (
    <div>
      {
        selectedTitle ?
        <div class="content">
          {
          selectedObj.content.map((p) => 
            <p key={p}>{p}</p>
          )}
        </div> :
        <div class="is-flex-direction-column is-justify-content-center is-align-content-center">
          <p>Please select a title from the list</p>
        </div>
      }
    </div>
  )
}
