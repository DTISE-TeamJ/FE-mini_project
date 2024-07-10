import React from "react";
import Sidebar from "../../../_components/Admin/Sidebar/Sidebar";
import Container from "../../../_components/Admin/Container/Container";
import Header from "../../../_components/Admin/Header/Header";
import Content from "../../../_components/Admin/Container/Content";
import Form from "@/app/_components/Admin/Form/Form";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router"; // Import from next/router instead of next/navigation

const EditEvent: React.FC = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <div className="app flex">
      <Sidebar />
      <Container>
        <Header />
        <Content>
          {/* <Form eventId={id} /> //Pass the id as a prop to Form */}
          <Form />
        </Content>
      </Container>
    </div>
  );
};

export default EditEvent;
