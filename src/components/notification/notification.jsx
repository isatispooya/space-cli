import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCorrespondencesData, useMarkAsRead } from "./hook/notification.get";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const Notification = () => {
  const { data } = useCorrespondencesData();
  const markAsReadMutation = useMarkAsRead();

  const [messages, setMessages] = useState([]);

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
    .sort((a, b) => a.read - b.read);

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

  const handleReadMessage = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
    markAsReadMutation.mutate(id);
  };

  const getIconForTag = (tag) => {
    switch (tag) {
      case "register" && "wellcom":
        return <HowToRegIcon sx={{ color: "#4CAF50" }} />; 
      case "invitation": 
        return <CoPresentIcon sx={{ color: "#2196F3" }} />;
      default:
        return <BubbleChartIcon sx={{ color: "#9C27B0" }} />; 
    }
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-2xl max-w-md fixed z-50"
          style={{
            maxWidth: "90%",
            minWidth: "500px",
            left: "130px",
            top: "80px",
            maxHeight: "600px",
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 px-4">
              <h1 className="text-2xl font-extrabold text-gray-900">اعلان‌ها</h1>
              {filteredMessages.some((msg) => !msg.read) && <button onClick={handleReadAll} className="text-blue-600 text-sm font-semibold hover:underline">خواندن همه</button>}
            </div>
            <div className="flex justify-around border-b-2 mb-6">
              <button
                onClick={() => setActiveTab("unread")}
                className={`text-sm font-semibold py-2 ${
                  activeTab === "unread"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                جدید
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={`text-sm font-semibold py-2 ${
                  activeTab === "read"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                همه
              </button>
            </div>
            <ul style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}>
              {filteredMessages.slice(0, visibleCount).length > 0 ? (
                filteredMessages.slice(0, visibleCount).map((msg) => (
                  <li
                    key={msg.id}
                    className={`py-4 px-4 mb-4 border-b flex items-center justify-between ${
                      msg.read ? "bg-white" : " rounded-lg  bg-gray-50"
                    } hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="font-medium ml-2 text-lg text-gray-800">
                          {getIconForTag(msg.tag)} {msg.title}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {msg.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: faIR })}
                        </div>
                      </div>
                      {!msg.read && (
                        <button
                          onClick={() => handleReadMessage(msg.id)}
                          className="text-blue-600 text-sm font-semibold hover:underline"
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
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleShowMore}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  نمایش بیشتر
                </button>
              </div>
            )}
            {visibleCount > 4 && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleShowLess}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  نمایش کمتر
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Notification;
