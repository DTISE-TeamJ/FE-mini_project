"use client";

import React from "react";

import {
  BarItemFilled,
  BarItemFull,
  BarItemInfo,
  BarItemInfoName,
  BarItemInfoValue,
  ProgressBarContainer,
  ProgressBarItem,
  ProgressBarList,
  ProgressBarTitle,
} from "./style";

const data = [
  { id: 1, name: "Jeans", percentValues: 70 },
  { id: 2, name: "Tracksuit", percentValues: 40 },
  { id: 3, name: "Belts", percentValues: 60 },
  { id: 4, name: "Shirts", percentValues: 80 },
  { id: 5, name: "Shoes", percentValues: 50 },
  { id: 6, name: "Others", percentValues: 20 },
];

const AreaProgressChart = () => {
  return (
    <ProgressBarContainer>
      <ProgressBarTitle>Most Sold Items</ProgressBarTitle>
      <ProgressBarList>
        {data.map((progressbar) => (
          <ProgressBarItem key={progressbar.id}>
            <BarItemInfo>
              <BarItemInfoName>{progressbar.name}</BarItemInfoName>
              <BarItemInfoValue>{progressbar.percentValues}</BarItemInfoValue>
            </BarItemInfo>
            <BarItemFull>
              <BarItemFilled
                style={{ width: `${progressbar.percentValues}%` }}
              />
            </BarItemFull>
          </ProgressBarItem>
        ))}
      </ProgressBarList>
    </ProgressBarContainer>
  );
};

export default AreaProgressChart;
