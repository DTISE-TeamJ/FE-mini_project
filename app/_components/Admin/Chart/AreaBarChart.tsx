"use client";

import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "@/context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "@/utils/theme";
import {
  BarChartContainer,
  BarChartInfo,
  BarChartTitle,
  BarChartWrapper,
  ChartInfoData,
  InfoDataText,
  InfoDataValue,
} from "./style";

const data = [
  { id: 1, month: "Jan", loss: 70, profit: 100 },
  { id: 2, month: "Feb", loss: 55, profit: 85 },
  { id: 3, month: "Mar", loss: 35, profit: 90 },
  { id: 4, month: "April", loss: 90, profit: 70 },
  { id: 5, month: "May", loss: 55, profit: 80 },
  { id: 6, month: "Jun", loss: 30, profit: 50 },
  { id: 7, month: "Jul", loss: 32, profit: 75 },
  { id: 8, month: "Aug", loss: 62, profit: 86 },
  { id: 9, month: "Sep", loss: 55, profit: 78 },
  { id: 10, month: "Oct", loss: 33, profit: 89 },
  { id: 11, month: "Nov", loss: 44, profit: 77 },
  { id: 12, month: "Dec", loss: 38, profit: 109 },
];

const AreaBarChart: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value: any) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value: any) => {
    return `${value}k`;
  };

  const formatLegendValue = (value: any) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <BarChartContainer>
      <BarChartInfo>
        <BarChartTitle>Total Revenue</BarChartTitle>
        <ChartInfoData>
          <InfoDataValue>€50.4K</InfoDataValue>
          <InfoDataText>
            <FaArrowUpLong />
            <p>5% than last month.</p>
          </InfoDataText>
        </ChartInfoData>
      </BarChartInfo>
      <BarChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={700}
            height={500}
            data={data}
            margin={{ top: 10, right: 15, left: 15, bottom: 10 }}>
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                // fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fill: "#676767",
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                // fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fill: "#676767",
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="profit"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="loss"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </BarChartWrapper>
    </BarChartContainer>
  );
};

export default AreaBarChart;
