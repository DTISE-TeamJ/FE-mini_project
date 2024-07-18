"use client";

import React, { useContext, useEffect } from "react";
import Sidebar from "../../_components/Admin/Sidebar/Sidebar";
import Container from "../../_components/Admin/Container/Container";
import Header from "../../_components/Admin/Header/Header";
import Content from "../../_components/Admin/Container/Content";
import CardList from "../../_components/Admin/Card/CardList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AreaCharts from "@/app/_components/Admin/Chart/AreaCharts";
import { ThemeContext, ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { DARK_THEME, LIGHT_THEME } from "@/utils/theme";
import { FaMoon, FaSun } from "react-icons/fa";
import AreaCards from "@/app/_components/Admin/NewCard/AreaCards";
import AnalyticsForm from "@/app/_components/Analytics/AnalyticsForm";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // const { theme, toggleTheme } = useContext(ThemeContext);

  if (session?.user?.role === "USER") {
    router.push("/");
  }

  const theme = {
    secondaryColor: "#fff",
    lgTextColor: "#525252",
    xlTextColor: "#292929",
    baseTextColor: "#676767",
    lightShadow1: "rgba(0, 0, 0, 0.02) 0px 4px 12px",
    borderColorInverted: "#f6f6f6",
    textColorInverted: "#292929",
  };

  // useEffect(() => {
  //   if (theme === DARK_THEME) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, [theme]);

  return (
    <>
      {/* <ThemeProvider theme={theme}>
      <GlobalStyles theme={{ mode: theme }} /> */}
      <div className="app flex">
        <Sidebar />
        <Container>
          <Header />
          <Content>
            {/* <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}>
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? <FaSun/> : <FaMoon />}
          /> */}
            {/* <CardList /> */}
            <AreaCards />
            <AreaCharts />
          </Content>
        </Container>
      </div>
      {/* <AnalyticsForm /> */}

      {/* </ThemeProvider> */}
    </>
  );
};

export default Dashboard;
