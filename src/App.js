import "./App.css";
import useAnimals from "./useAnimals";
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import AnimalsCarousel from "./components/AnimalsCarousel";
import "bootstrap/dist/css/bootstrap.css";
import YoutubeEmbed from "./components/YoutubeEmbed";
import useSelectedAnimal from "./useSelectedAnimal";

function App() {
  const animals = useAnimals();
  const [selectedAnimal, fetchAnimal] = useSelectedAnimal();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [optionToShow, setOptionToShow] = useState(false);
  //console.log(animals);

  const toggle = () => {
    setModal(!modal);
  };

  const getSelectedAnimal = (id, option) => {
    fetchAnimal(id);
    setOptionToShow(option);
    toggle();
  };

  useEffect(() => {
    console.log(selectedAnimal.idVideo)
    if (optionToShow === "carousel") setShow(<AnimalsCarousel animal={selectedAnimal} />);
    if (optionToShow === "video") setShow(<YoutubeEmbed embedId={selectedAnimal.idVideo} />);
  }, [selectedAnimal]);

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
                      <Button onClick={() => getSelectedAnimal(animal.id, "carousel")}>
                        Images
                      </Button>
                      <Button onClick={() => getSelectedAnimal(animal.id, "video")}>Video</Button>
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
                    {show}
                    {show === "video" ? <YoutubeEmbed /> : ""}
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
