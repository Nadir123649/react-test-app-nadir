import React from "react";

const getImageUrl = (person, size = "s") => {
  return ( "https://i.imgur.com/" + person.imageId + size + ".jpg");
};

export default getImageUrl;
