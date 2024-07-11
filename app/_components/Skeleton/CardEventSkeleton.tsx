"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardStyle } from "../Admin/Card/style";

const CardEventSkeleton: React.FC = () => {
  return (
    <CardStyle padding="0">
      <Skeleton height={100} width="100%" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={30} width="60%" />
      <Skeleton height={20} width="70%" />
      <Skeleton height={20} width="90%" />
      <Skeleton height={20} width="50%" />
      <div className="flex justify-around gap-4">
        <Skeleton height={40} width="45%" />
        <Skeleton height={40} width="45%" />
      </div>
    </CardStyle>
  );
};

export default CardEventSkeleton;
