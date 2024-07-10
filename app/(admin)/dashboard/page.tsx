"use client";

import React from "react";
import Sidebar from "../../_components/Admin/Sidebar/Sidebar";
import Container from "../../_components/Admin/Container/Container";
import Header from "../../_components/Admin/Header/Header";
import Content from "../../_components/Admin/Container/Content";
import CardList from "../../_components/Admin/Card/CardList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReduxProvider from "@/store/redux-provider";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role === "USER") {
    router.push("/");
  }

  return (
    // <ReduxProvider>
    <div className="app flex">
      <Sidebar />
      <Container>
        <Header />
        <Content>
          <CardList />
        </Content>
      </Container>
    </div>
    // </ReduxProvider>
  );
};

export default Dashboard;
