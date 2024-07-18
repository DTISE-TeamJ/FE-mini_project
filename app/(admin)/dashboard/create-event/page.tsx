import React from "react";
import Sidebar from "../../../_components/Admin/Sidebar/Sidebar";
import Container from "../../../_components/Admin/Container/Container";
import Header from "../../../_components/Admin/Header/Header";
import Content from "../../../_components/Admin/Container/Content";
import Form from "@/app/_components/Admin/Form/Form";
import FormContTest from "@/app/_components/Admin/Form/FormContTest";

const CreateEvent: React.FC = () => {
  return (
    <div className="app flex">
      <Sidebar />
      <Container>
        <Header />
        <Content>
          {/* <Form /> */}
          <FormContTest />
        </Content>
      </Container>
    </div>
  );
};

export default CreateEvent;
