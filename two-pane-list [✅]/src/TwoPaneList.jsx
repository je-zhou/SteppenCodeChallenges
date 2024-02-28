import React, {useState} from "react";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";

// Two Pane Layout
// Left pane contains list of titles
// Right pane contains content relevant to the selected title
// When no title selected right-hand pane has an empty state telling people to select a title

// @param {Object} data
// data: {
//   title: string,
//   content: string[]
// }[]

export const TwoPaneList = ({ data }) => {
  const [title, setTitle] = useState(null);

  return (
    <div class="columns">
      {/* Left Pane */}
      <div class="column">
        <LeftPane
          selectedTitle={title}
          titles={data.map((obj) => obj.title)}
          onClick={setTitle}
        />
      </div>
      {/* Right Pane */}
      <div class="column">
        <RightPane 
          data={data}
          selectedTitle={title}
        />
      </div>
    </div>
  )
}
