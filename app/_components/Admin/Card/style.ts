"use client";

import styled from "styled-components";

export const CardListStyle = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background: #eee;
  gap: 20px;
`;

export const CardIconStyle = styled.div`
  background: #fff;
  width: 30px;
  height: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border-radius: 50%;
`;

export const CardGrowth = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;
