import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import {
  Button,
  ButtonGroup,
} from "reactstrap";

function Animal({animal, getSelectedAnimal}, key) {

  return (
    <Card key={key} className="Animal shadow p-3 mb-5 bg-white rounded">
      <CardBody>
        <div className="card-content-top">
          <CardTitle tag="h3">{animal.name}</CardTitle>
          <CardImg bottom width="100%" src={animal.img} alt={animal.title} />
          {/* style={{fontSize: "24px"}} */}
          <CardSubtitle tag="h6" className="mb-2 pt-3 text-danger ">
            <i>{animal.latinName}</i>
          </CardSubtitle>
        </div>
        <ButtonGroup>
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
    </Card>
  );
}

export default Animal;
