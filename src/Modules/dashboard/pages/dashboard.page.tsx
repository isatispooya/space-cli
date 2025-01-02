import { MainLayout } from "../../../layouts";
import { Greetings, Shortcuts } from "../components";

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <Greetings />
        <Shortcuts />
      </MainLayout>
    </>
  );
};

export default Dashboard;
