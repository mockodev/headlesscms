import { useState } from "react";
import { client } from "./client";

const getAnimal = (animal) => ({
  idVideo: animal.fields.video.fields.file.fileName.replace("watch?v=", ""),
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url + "?w=470&h=300&fit=fill",
    title: thumb.fields.title,
  })),
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

function useSelectedAnimal(id) {
  const [selectedAnimal, setSelectedAnimal] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchAnimal = (id) => {
    setIsloading(true)
    client.getEntry(id).then((response) => {      
      setSelectedAnimal(getAnimal(response));
      setIsloading(false)
      //console.log(response);      
    });
  };

  

  
  return [selectedAnimal, fetchAnimal, isLoading];
}

export default useSelectedAnimal;
/*
import { useEffect, useState } from "react";
import { client } from "./client";
import PropTypes from "prop-types";

const getAnimal = (animal) => ({
  idVideo: animal.fields.video.fields.file.fileName.replace("watch?v=", ""),
  name: animal.fields.name,
  latinName: animal.fields.latinName,
  thumbnails: animal.fields.thumbnails?.map((thumb) => ({
    url: thumb.fields.file.url + "?w=470&h=300&fit=fill",
    title: thumb.fields.title,
  })),
  img: animal.fields.image?.fields.file.url + "?w=400&h=300&fit=fill",
});

function useSelectedAnimal(id) {
  const [selectedAnimal, setSelectedAnimal] = useState([]);

  const fetchAnimal = (id) => {
    client.getEntry(id).then((response) => {      
      setSelectedAnimal(getAnimal(response));
      //console.log(response);      
    });
  };

  

  
  return [selectedAnimal, fetchAnimal];
}

export default useSelectedAnimal;

*/