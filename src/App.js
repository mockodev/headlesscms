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
import useSelectedAnimal from "./useSelectedAnimal";

function App() {
  const animals = useAnimals();
  const [selectedAnimal, fetchAnimal] = useSelectedAnimal();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  //console.log(animals);

  const toggle = (option) => {
    setShow(option);
    setModal(!modal);
  };

    const getSelectedAnimal = (id) => {
      console.log("here");
      fetchAnimal(id);
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
              {animals.map((animal) => {
                return (
                  <>
                    <div className="Animal">
                      <h3>{animal.name}</h3>
                      <h2>{animal.latinName}</h2>
                      <img src={animal.img} alt={animal.title} />
                      <ButtonGroup>
                        <Button onClick={() => getSelectedAnimal(animal.id)}>Images</Button>
                        <Button onClick={() => toggle("video")}>Video</Button>
                      </ButtonGroup>
                      <div className="Modal">
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader
                            className="modal__header"
                            toggle={toggle}
                          ></ModalHeader>
                          <ModalBody className="modal__body row">
                            {show === "image" ? (
                              <AnimalsCarousel animal={animal} />
                            ) : (
                              ""
                            )}
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
                  </>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
