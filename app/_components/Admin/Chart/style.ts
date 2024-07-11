"use client";
import styled from "styled-components";

// AreaCharts
export const ContentAreaCharts = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: 100%;
  }
`;

// AreaBarChart
export const BarChartContainer = styled.div`
  background-color: #fff;
  padding: 16px 16px 6px 16px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 12px;
  position: relative;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const BarChartWrapper = styled.div`
  width: 100%;
  height: 240px;

  .recharts-wrapper {
    @media (max-width: 1400px) {
      margin-left: -10px;
    }
  }
`;

export const BarChartInfo = styled.div`
  margin-bottom: 32px;
`;

export const BarChartTitle = styled.h5`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #292929;
`;

export const ChartInfoData = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const InfoDataValue = styled.div`
  color: #292929;
  font-size: 24px;
  font-weight: 700;
`;

export const InfoDataText = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
  color: #4ce13f;
`;

// AreProgressChart
export const ProgressBarContainer = styled.div`
  padding: 16px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 12px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ProgressBarTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #292929;
  margin-bottom: 16px;
`;

export const ProgressBarList = styled.div`
  display: grid;
  row-gap: 20px;
`;

export const ProgressBarItem = styled.div``;

export const BarItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 6px;
  margin-bottom: 8px;
`;

export const BarItemInfoName = styled.p`
  color: #292929;
  font-weight: 600;
`;

export const BarItemInfoValue = styled.p`
  color: #292929;
  font-weight: 600;
`;

export const BarItemFull = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 100vh;
  background-color: #e6e6e6;
  position: relative;
`;

export const BarItemFilled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 100vh;
  background-color: #475be8;
`;
