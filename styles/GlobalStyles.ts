import { createGlobalStyle, css } from "styled-components";

const lightMode = css`
  --primary-color: #475be8;
  --secondary-color: #fff;
  --background-color: #fafafa;
  --logo-color: var(--primary-color);
  --xl-text-color: #292929;
  --lg-text-color: #525252;
`;

const darkMode = css`
  --primary-color: #475be8;
  --secondary-color: #2e2e48;
  --background-color: #383854;
  --logo-color: #fff;
  --xl-text-color: #ffff;
  --lg-text-color: #f3f3f3;
`;

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");

  :root {
    --font-family-lato: "Lato", sans-serif;
    --font-family-manrope: "Manrope", sans-serif;
    --font-size: 16px;
    --line-height: 1.6;
    --font-weight: 400;
    --default-transition: all 300ms ease-in-out;
  }

  body {
    font-family: var(--font-family-lato);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    ${(props) => (props.theme.mode === "dark" ? darkMode : lightMode)};
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: transparent;
    border: none;
    outline: 0;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  .theme-toggle-btn {
    background-color: var(--bg-color-inverted);
    position: fixed;
    right: 0;
    top: 20px;
    width: 48px;
    height: 40px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: 0;
    z-index: 999;
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .theme-icon {
      width: 24px;
    }
  }

  .page-wrapper {
    background-color: var(--background-color);
    min-height: 100vh;
    overflow: hidden;
  }

  .content-wrapper {
    background-color: var(--background-color);
    min-height: 100vh;
    padding: 50px 58px;
    margin-left: 260px;

    @media (max-width: 1400px) {
      padding: 32px;
    }

    @media (max-width: 1200px) {
      margin-left: 56px;
    }

    @media (max-width: 768px) {
      margin-left: 0;
      padding: 24px;
    }

    @media (max-width: 576px) {
      margin-left: 0;
      padding: 16px;
    }
  }

  .content-area > section {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .recharts-default-tooltip {
    padding: 4px 8px !important;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 4px 12px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.secondaryColor} !important;
    border: 1px solid ${({ theme }) => theme.borderColorInverted} !important;
  }

  .recharts-tooltip-item-list {
    * {
      color: ${({ theme }) => theme.textColorInverted} !important;
      font-size: 14px;
      font-family: inherit !important;
      opacity: 0.9;
    }
  }
`;

export default GlobalStyles;
