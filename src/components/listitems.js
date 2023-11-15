import React from "react";
import  people  from "./data.js";
import getImageUrl from "./utilitey";


const Listitems = people.map((person) => (
  <li key={person.id}>
    <img src={getImageUrl(person)} alt={person.name} />
    <p>
      <b>{person.name}:</b>
      {" " + person.profession + " "}
      known for {person.accomplishment}
    </p>
  </li>
));

export default Listitems;
