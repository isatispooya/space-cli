import React from "react";
import { ContactView } from "../feature";
import { MainLayout } from "../../../layouts";

const ContactMainPage: React.FC = () => {
  return (
    <MainLayout>
      <ContactView />
    </MainLayout>
  );
};

export default ContactMainPage;
