import "./App.css";
import "./custom.scss";
import useAnimals from "./useAnimals";
import React, { useState } from "react";
import {
  Container,  
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
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
import logo from './img/Absolute_amazing_animals.png'

function App() {
  // hook created to collect all the animals from the API
  const animals = useAnimals();
  const [selectedAnimal, fetchAnimal, isLoading] = useSelectedAnimal();
  const [modal, setModal] = useState(false);
  const [optionToShow, setOptionToShow] = useState("video");
  //console.log(animals);

  const toggle = () => {
    setModal(!modal);
  };

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

  return (
    <div className="App">
      <header fluid>
        <img src={logo} alt="Absolut amazing animals"/>
      </header>
      <main>
        <Container>
        <div className="wrapper">
          <div className="AnimalList">
            {animals.map((animal, index) => {
              return (
                <Card key={index} className="Animal shadow p-3 mb-5 bg-white rounded">
                  <CardBody>
                    <div className="card-content-top">
                      <CardTitle tag="h3">{animal.name}</CardTitle>
                      <CardImg
                        bottom
                        width="100%"
                        src={animal.img}
                        alt={animal.title}
                      />
                      {/* style={{fontSize: "24px"}} */}
                      <CardSubtitle tag="h6" className="mb-2 pt-3 text-danger ">
                        <i>{animal.latinName}</i>
                      </CardSubtitle>
                    </div>
                    <ButtonGroup >
                      <Button
                        data-id={animal.id}
                        data-content-type="carousel"
                        onClick={getSelectedAnimal}
                      >
                        Images
                      </Button>
                      <Button
                        data-id={animal.id}
                        data-content-type="video"
                        onClick={getSelectedAnimal}
                      >
                        Video
                      </Button>
                    </ButtonGroup>
                  </CardBody>

                  {/* <img src={animal.img} alt={animal.title} /> */}
                </Card>
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
        </Container>
      </main>
    </div>
  );
}

export default App;
