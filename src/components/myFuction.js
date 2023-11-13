import React from "react";
import { useState } from "react";

function Myfuction() {
  const [color, setColor] = useState("red");
  return (
    <div>
      <>
        <h1> my favourite color is {color}!</h1>
        <button type="button" onClick={() => setColor("yellow")}>
          Click me
        </button>
      </>
    </div>
  );
}

export default Myfuction;
