import React from "react";

function Calculation({ setCount }) {
  return (
    <div>
      <>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
      </>
    </div>
  );
}

export default Calculation;
