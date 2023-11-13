import React from "react";
import { useState } from "react";

const Mycar = () => {
  const [value, setValue] = useState({
    brand: "Altis",
    car: "Altis",
    year: "2004",
    model: "Worthy",
    color: "red",
  });

  const updateColor = () => {
    setValue((previousState) => {
      return { ...previousState, color: "lightgrey" };
    });
  };

  return (
    <div>
      <>
        <h1>My car brand is {value.car}</h1>
        <p>
          Its model is {value.model} and its worth is {value.brand} and from{" "}
          {value.year}.my car color is {value.color}.
          <button onClick={updateColor}>click to see reults</button>
        </p>
      </>
    </div>
  );
};

export default Mycar;
