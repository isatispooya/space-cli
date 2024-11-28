import { MainLayout } from "../../../layouts";
import Settings from "../../settings/components/settings";
import ProfileDetail from "../features/profile.detail";

const ProfilePage: React.FC = () => {
  
  return (
    <MainLayout>
      <ProfileDetail />
      <Settings />
    </MainLayout>
  );
};

export default ProfilePage;
