import React from "react";
import { IoPerson } from "react-icons/io5";
// import "./Card.css";
import { CardStyle, CardIconStyle, CardGrowth } from "./style";

const Card: React.FC = () => {
  return (
    /*
    <div className="card">
      <div className="card--header">
        <div className="card--icon">
          <IoPerson />
        </div>
      </div>
      <div className="card--body">
        <h2 className="amount">$20,000</h2>
        <div className="growth">
          <p>Total Sales</p> <span>+12%</span>
        </div>
      </div>
    </div>
    */

    <CardStyle>
      <div className="card--header">
        <CardIconStyle>
          <IoPerson />
        </CardIconStyle>
      </div>
      <div className="card--body">
        <h2 className="amount">$20,000</h2>
        <CardGrowth>
          <p>Total Sales</p> <span>+12%</span>
        </CardGrowth>
      </div>
    </CardStyle>
  );
};

export default Card;
