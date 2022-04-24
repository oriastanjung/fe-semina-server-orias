import React from "react";
import {Card, ListGroup} from "react-bootstrap"

function CardWithList({cardHeader, widthProps, variant, items, labels}) {
  let data = [];
  data = items;
  let listLabel = [];
  listLabel = labels;
  return (
    <>
      <Card style={{ width: {widthProps}}}>
        <Card.Header>{cardHeader}</Card.Header>
        <ListGroup variant={variant}>
          {data.map((item,id) => 
            <ListGroup.Item key={id}>{listLabel[id]} : {item}</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
}

export default CardWithList;
