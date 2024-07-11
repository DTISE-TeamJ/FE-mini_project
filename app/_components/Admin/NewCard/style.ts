"use client";

import styled from "styled-components";

// AreaCards
export const ContentAreaCards = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 12px;
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 100%;
  }
`;

// AreaCard
export const AreaCardContainer = styled.div`
  // background-color: ${({ theme }) => theme.secondaryColor};
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 20px 16px;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 12px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const AreaCardInfo = styled.div`
  .info-title {
    // color: ${({ theme }) => theme.lgTextColor};
    color: #525252;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .info-value {
    // color: ${({ theme }) => theme.xlTextColor};
    color: #292929;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .info-text {
    // color: ${({ theme }) => theme.baseTextColor};
    color: #676767;
    font-weight: 500;
  }
`;

export const AreaCardChart = styled.div``;
