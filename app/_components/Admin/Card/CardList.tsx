import React from "react";
import Card from "./Card";
import { CardListStyle } from "./style";

const CardList: React.FC = () => {
  return (
    <CardListStyle>
      <Card />
      <Card />
      <Card />
      <Card />
    </CardListStyle>
  );
};

export default CardList;
