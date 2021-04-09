import { useEffect, useState } from "react";
import { client } from "./client";
import PropTypes from "prop-types";

const getAnimal = (animal) => ({
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url,
    title: thumb.fields.title,
  })),
  //crop: animal.fields?.fields.file.url + "?w=300&h=200&fit=crop",
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

function useSelectedAnimal(id) {
  const [selectedAnimal, setSelectedAnimal] = useState([]);

  const fetchAnimal = (id) => {
    client.getEntry(id).then((response) => {
      console.log(response); 
      //const newAnimals = response.items.map((item) => getAnimal(item));
      return getAnimal(response);
    });
  }

  

  
  return [selectedAnimal, fetchAnimal];
}

export default useSelectedAnimal;

