import { MainLayout } from "../../../layouts";
import Conversation from "../feature/conversation.field";

const ConversationPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            سامانه مدیریت گفتگو
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری گفتگو های سازمانی به صورت هوشمند
          </p>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="flex-grow px-6 bg-white">
            <Conversation />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConversationPage;
