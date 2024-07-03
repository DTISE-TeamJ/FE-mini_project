import React from "react";
import Sidebar from "../../../_components/Admin/Sidebar/Sidebar";
import Container from "../../../_components/Admin/Container/Container";
import Header from "../../../_components/Admin/Header/Header";
import Content from "../../../_components/Admin/Container/Content";
import Form from "@/app/_components/Admin/Form/Form";
// import CardList from "../../_components/Admin/Card/CardList";

const CreateEvent = () => {
  return (
    <div className="app flex">
      <Sidebar />
      <Container>
        <Header />
        <Content>
          <Form />
        </Content>
      </Container>
    </div>
  );
};

export default CreateEvent;
