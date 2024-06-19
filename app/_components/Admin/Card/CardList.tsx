import React from "react";
import Card from "./Card";
import { CardListStyle } from "./style";

const CardList: React.FC = () => {
  return (
    /*
    <div className="card--list">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    */
    <CardListStyle>
      <Card />
      <Card />
      <Card />
      <Card />
    </CardListStyle>
  );
};

export default CardList;
