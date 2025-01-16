import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCorrespondencesData, useMarkAsRead } from "./hook/notification.get";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface NotificationMessage {
  id: number;
  title: string;
  text: string;
  tag: string;
  read: boolean;
  createdAt: string;
}



const NotificationComponent = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>((props, ref) => {
  const { data } = useCorrespondencesData();
  const markAsReadMutation = useMarkAsRead();

  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    if (data) {
      const formattedMessages = data.map((item) => ({
        id: item.id,
        title: item.title,
        text: item.message,
        tag: item.tag,
        read: item.read,
        createdAt: item.created_at,
      }));
      setMessages(formattedMessages);
    }
  }, [data]);


  const [activeTab, setActiveTab] = useState("unread");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredMessages = messages
    .filter((msg) => (activeTab === "unread" ? !msg.read : true))
    .sort((a, b) => Number(a.read) - Number(b.read));

  const handleReadAll = () => {
    const unreadMessages = messages.filter((msg) => !msg.read);
    unreadMessages.forEach((msg) => {
      markAsReadMutation.mutate(msg.id);
    });
    setMessages(messages.map((msg) => ({ ...msg, read: true })));
  };

  const handleShowMore = () => {
    setVisibleCount(filteredMessages.length);
  };

  const handleShowLess = () => {
    setVisibleCount(4);
  };

  const handleReadMessage = (id: number) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
    markAsReadMutation.mutate(id);
  };

  const getIconForTag = (tag: string) => {
    switch (tag) {
      case "register":
      case "wellcom":
        return <HowToRegIcon sx={{ color: "#4CAF50" }} />;
      case "invitation":
        return <CoPresentIcon sx={{ color: "#2196F3" }} />;
      case "pendding":
        return <PendingIcon sx={{ color: "#FFA726" }} />;
      case "approved":
        return <CheckCircleIcon sx={{ color: "#4CAF50" }} />;
      case "success":  
        return <TaskAltIcon sx={{ color: "#4CAF50" }} />;
      case "rejected":
        return <CancelIcon sx={{ color: "#F44336" }} />;

      default:
        return <BubbleChartIcon sx={{ color: "#9C27B0" }} />;
    }
  };

  return (
      <div ref={ref}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-2xl fixed z-50"
            style={{
              width: "100%",
              maxWidth: "320px",
              minWidth: "300px",
              left: "80px",
              top: "100px",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  اعلان‌ها
                </h1>
                {filteredMessages.some((msg) => !msg.read) && (
                  <button
                    onClick={handleReadAll}
                    className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
                  >
                    خواندن همه
                  </button>
                )}
              </div>
              <div className="flex justify-around border-b-2 mb-4 sm:mb-6">
                <button
                  onClick={() => setActiveTab("unread")}
                  className={`text-xs sm:text-sm font-semibold py-1 sm:py-2 ${
                    activeTab === "unread"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  جدید
                </button>
                <button
                  onClick={() => setActiveTab("read")}
                  className={`text-xs sm:text-sm font-semibold py-1 sm:py-2 ${
                    activeTab === "read"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  همه
                </button>
              </div>
              <ul
                style={{
                  minHeight: "300px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {filteredMessages.slice(0, visibleCount).length > 0 ? (
                  filteredMessages.slice(0, visibleCount).map((msg) => (
                    <li
                      key={msg.id}
                      className={`py-2 sm:py-4 px-2 sm:px-4 mb-2 sm:mb-4 border-b flex items-center justify-between ${
                        msg.read ? "bg-white" : " rounded-lg  bg-gray-50"
                      } hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span className="font-medium ml-1 sm:ml-2 text-sm sm:text-lg text-gray-800">
                            {getIconForTag(msg.tag)} {msg.title}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {msg.text}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(msg.createdAt), {
                              addSuffix: true,
                              locale: faIR,
                            })}
                          </div>
                        </div>
                        {!msg.read && (
                          <button
                            onClick={() => handleReadMessage(msg.id)}
                            className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
                          >
                            خواندن
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-4 px-4 mb-4 text-center text-gray-500">
                    هیچ پیامی موجود نیست
                  </li>
                )}
              </ul>
              {visibleCount < filteredMessages.length && (
                <div className="flex justify-center mt-4 sm:mt-6">
                  <button
                    onClick={handleShowMore}
                    className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
                  >
                    نمایش بیشتر
                  </button>
                </div>
              )}
              {visibleCount > 4 && (
                <div className="flex justify-center mt-2 sm:mt-3">
                  <button
                    onClick={handleShowLess}
                    className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline"
                  >
                    نمایش کمتر
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
});

export default NotificationComponent;
