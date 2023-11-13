import React from "react";

const Items = ({ value, isValued }) => {
  return (
    <li className="item">
      {value} {isValued && "✔ True"}
    </li>
  );
};

export default Items;
