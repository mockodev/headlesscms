import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Animal from "./Animal";
import AnimalsCarousel from "./AnimalsCarousel";
import YoutubeEmbed from "./YoutubeEmbed";
import useSelectedAnimal from "../hooks/useSelectedAnimal";
import useAnimals from "../hooks/useAnimals";


function AnimalsList() {
  // hook created to collect all the animals from the API
  //console.log(animals);
  const [selectedAnimal, fetchAnimal, isLoading] = useSelectedAnimal();
  const [optionToShow, setOptionToShow] = useState("video");
  const animals = useAnimals();
  const [modal, setModal] = useState(false);


  const getSelectedAnimal = (e) => {
    const { id, contentType } = e.target.dataset; //convention in React? To clarify with Patrick
    fetchAnimal(id);
    setOptionToShow(contentType);
    toggle();
  };

  const modalContent = {
    carousel: <AnimalsCarousel animal={selectedAnimal} />,
    video: <YoutubeEmbed embedId={selectedAnimal.idVideo} />,
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="AnimalsList mb-5">
      {animals.map((animal, index) => {
        return (
          <Animal animal={animal} getSelectedAnimal={getSelectedAnimal} key={index} />
        );
      })}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal__header" toggle={toggle}></ModalHeader>
        <ModalBody className="modal__body row">
          {!isLoading && modalContent[optionToShow]}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AnimalsList;
