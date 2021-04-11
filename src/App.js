import "./App.css";
import useAnimals from "./useAnimals";
import React, { useState, useEffect } from "react";
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
  const animals = useAnimals();
  const [selectedAnimal, fetchAnimal, isLoading] = useSelectedAnimal();
  const [modal, setModal] = useState(false);
  const [optionToShow, setOptionToShow] = useState("video");
  //console.log(animals);

  const toggle = () => {
    setModal(!modal);
  };

  const getSelectedAnimal = (e) => {
    const {id, contentType} = e.target.dataset;
    fetchAnimal(id);
    setOptionToShow(contentType);
    toggle();
  };

  const modalContent = {
    carousel: <AnimalsCarousel animal={selectedAnimal} />,
    video: <YoutubeEmbed embedId={selectedAnimal.idVideo} />,
  }

  /*
  // calling the fetchAnimal hook to get the single animal data
  // option variable is passed to control what is needed to show depend of the clicked button
  const getSelectedAnimal = (id, option) => {
    fetchAnimal(id);
    setOptionToShow(option);
    toggle();
  };

  // when the selectedAnimal is updated show the selected option (carousel or video)
  // using useEffect hook to show the data after the response of the API (when the selectedAnimal variable change)
  useEffect(() => {
    console.log(selectedAnimal.idVideo);
    if (optionToShow === "carousel")
      setShow(<AnimalsCarousel animal={selectedAnimal} />);
    if (optionToShow === "video")
      setShow(<YoutubeEmbed embedId={selectedAnimal.idVideo} />);
  }, [selectedAnimal]); // here is the control of the selectedAnimal variable
*/
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
              {animals.map((animal) => {
                return (
                  <div className="Animal">
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
