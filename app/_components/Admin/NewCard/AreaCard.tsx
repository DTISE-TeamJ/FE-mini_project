"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AreaCardChart, AreaCardContainer, AreaCardInfo } from "./style";

interface CardInfo {
  title: string;
  value: string;
  text: string;
}

interface AreaCardProps {
  colors: string[];
  percentFillValue: number;
  cardInfo: CardInfo;
}

const AreaCard: React.FC<AreaCardProps> = ({
  colors = ["#e4e8ef", "#475be8"],
  percentFillValue = 0,
  cardInfo = { title: "", value: "", text: "" },
}) => {
  const filledValue = (percentFillValue / 100) * 360; // 360 degrees for a full circle
  const remainedValue = 360 - filledValue;
  const [isClient, setIsClient] = useState(false);

  const data = [
    { id: 1, name: "Remained", value: remainedValue },
    { id: 2, name: "Achieved Sales", value: filledValue },
  ];

  const renderTooltipContent = (value: number) => {
    return `${(value / 360) * 100} %`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AreaCardContainer>
      <AreaCardInfo>
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </AreaCardInfo>

      {/* <AreaCardChart>
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx={50}
            cy={45}
            innerRadius={20}
            fill="#e4e8ef"
            paddingAngle={0}
            dataKey="value"
            startAngle={-270}
            endAngle={150}
            stroke="none">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={renderTooltipContent} />
        </PieChart>
      </AreaCardChart> */}

      {isClient && (
        <AreaCardChart>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </AreaCardChart>
      )}
    </AreaCardContainer>
  );
};

export default AreaCard;
