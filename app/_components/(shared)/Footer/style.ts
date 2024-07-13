"use client";

import styled from "styled-components";

export const FooterContainer = styled.footer`
  font-family: "Poppins", sans-serif;
  width: 100%;
  bottom: 0;
  background: linear-gradient(to right, #00093c, #2d0b00);
  color: #fff;
  padding: 100px 0 30px;
  font-size: 13px;
  line-height: 20px;

  @media (max-width: 700px) {
    bottom: unset;
  }
`;

export const Row = styled.div`
  width: 85%;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  @media (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Column = styled.div`
  flex-basis: 25%;
  padding: 10px;

  &:nth-child(2),
  &:nth-child(3) {
    flex-basis: 15%;

    @media (max-width: 700px) {
      flex-basis: 100%;
    }
  }

  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`;

export const Heading = styled.h3`
  width: -moz-fit-content;
  width: fit-content;
  margin-bottom: 40px;
  position: relative;
`;

export const Underline = styled.div`
  width: 100%;
  height: 5px;
  background: #767676;
  border-radius: 3px;
  position: absolute;
  top: 25px;
  left: 0;
  overflow: hidden;

  span {
    width: 15px;
    height: 100%;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 10px;
    animation: moving 2s linear infinite;
  }

  @keyframes moving {
    0% {
      left: -20px;
    }
    100% {
      left: 100%;
    }
  }
`;

export const EmailId = styled.p`
  width: -moz-fit-content;
  width: fit-content;
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
`;

export const Logo = styled.img`
  width: 80px;
  margin-bottom: 30px;
`;

export const List = styled.ul`
  list-style: none;

  li {
    margin-bottom: 12px;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

export const Form = styled.form`
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 50px;

  .far {
    font-size: 18px;
    margin-right: 10px;
  }

  input {
    width: 100%;
    background: transparent;
    color: #ccc;
    border: 0;
    outline: none;
  }

  .fas {
    font-size: 16px;
    cursor: pointer;
  }
`;

export const SocialIcons = styled.div`
  display: flex;

  .fab {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 8px;
    background: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    color: #000;
    margin-right: 10px;
    cursor: pointer;
  }

  @media (max-width: 576px) {
    justify-content: space-evenly;
    gap: 20px;

    .fab {
      margin-right: 0;
    }
  }
`;

export const Divider = styled.hr`
  width: 90%;
  border: 0;
  border-bottom: 1px solid #ccc;
  margin: 20px auto;
`;

export const Copyright = styled.p`
  text-align: center;
`;
