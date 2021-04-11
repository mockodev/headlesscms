import "./App.css";
import useAnimals from "./useAnimals";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import AnimalsCarousel from "./components/AnimalsCarousel";
import "bootstrap/dist/css/bootstrap.css";
import YoutubeEmbed from "./components/YoutubeEmbed";
import useSelectedAnimal from "./useSelectedAnimal";

function App() {
  // hook created to collect all the animals from the API.
  const animals = useAnimals();
  const [selectedAnimal, fetchAnimal, isLoading] = useSelectedAnimal();
  const [modal, setModal] = useState(false);
  const [optionToShow, setOptionToShow] = useState("video");
  //console.log(animals);

  const toggle = () => {
    setModal(!modal);
  };

  const getSelectedAnimal = (e) => {
    const {id, contentType} = e.target.dataset; //convention in React? To clarify with Patrick
    fetchAnimal(id);
    setOptionToShow(contentType);
    toggle();
  };

  const modalContent = {
    carousel: <AnimalsCarousel animal={selectedAnimal} />,
    video: <YoutubeEmbed embedId={selectedAnimal.idVideo} />,
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="wrapper"></div>
          <span>Astonishing Animals</span>
        </header>
        <main className="Animal">
          <div className="wrapper">
            <div className="AnimalList">
              {animals.map((animal, index) => {
                return (
                  <div key={index} className="Animal">
                    <h3>{animal.name}</h3>
                    <h2>{animal.latinName}</h2>
                    <img src={animal.img} alt={animal.title} />
                    <ButtonGroup>
                      <Button data-id={animal.id} data-content-type="carousel" onClick={getSelectedAnimal}>
                        Images
                      </Button>
                      <Button data-id={animal.id} data-content-type="video" onClick={getSelectedAnimal}>Video</Button>
                    </ButtonGroup>
                  </div>
                );
              })}
              <div className="Modal">
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader
                    className="modal__header"
                    toggle={toggle}
                  ></ModalHeader>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
