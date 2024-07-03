import React from "react";
import Image from "next/image";
import TestImage from "@/assets/0f0b35ba-3418-43a2-abca-48f6853f8739-1676972100440-d124e7b3ac7c8af4c6aa767a92d2d274.webp";
import { CardStyle } from "./style";

const CardEvent: React.FC = () => {
  return (
    <CardStyle padding="0">
      <Image
        src={TestImage}
        quality={100}
        height={300}
        width={300}
        rel="preload"
        alt="test-image"
        className="rounded-t-[10px]"
      />
      <div className="mx-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, hic
          eligendi. Expedita, ipsa sit?
        </p>
        <h1 className="my-2">Test Event</h1>
        <p>test location</p>
        <p className="text-red-600 mt-6 mb-2">test price</p>
      </div>
    </CardStyle>
  );
};

export default CardEvent;
