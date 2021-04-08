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
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import AnimalsCarousel from "./components/AnimalsCarousel";
import "bootstrap/dist/css/bootstrap.css";
import YoutubeEmbed from "./components/YoutubeEmbed";

function App() {
  const animals = useAnimals();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  //console.log(animals);

  const toggle = (option) => {
    setShow(option);
    setModal(!modal);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="wrapper"></div>
          <span>Astonishing Animals</span>
          <AnimalsCarousel />
          <YoutubeEmbed embedId="rokGy0huYEA" />
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
                      <Button onClick={() => toggle("image")}>Images</Button>
                      <Button onClick={() => toggle("video")}>Video</Button>
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
                    {show === "image" ? "" : ""}
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
