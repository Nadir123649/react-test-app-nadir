import React from "react";
import getImageUrl from "./utilitey";

const Avtar = ({person , size}) => {
  return (
    <div>
      <img className="avtar" src={getImageUrl(person)} alt={person.name}  width={size} height={size} />
    </div>
  );
};

export default Avtar;
