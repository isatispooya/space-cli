import { Button, TextField, Box } from "@mui/material";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { ChatType } from "../../types";
import { motion } from "framer-motion";

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  loading,
  handleFileUpload,
  filesCount,
}: ChatType["ChatInputProps"]) => {
  return (
    <>
      <Box
        className="p-4 bg-gray-100 flex items-center"
        sx={{
          boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
          backgroundColor: "#f1f5f9",
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Button
          variant="text"
          className="ml-2 text-gray-600 hover:bg-gray-100 rounded-full p-2"
          disabled={loading}
          onClick={handleFileUpload}
          sx={{
            minWidth: "40px",
            height: "40px",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            color: "#5677BC",
            "&:hover": {
              backgroundColor: "rgba(86,119,188, 0.1)",
              transform: "rotate(15deg)",
            },
          }}
        >
          <FaPaperclip
            className={filesCount > 0 ? "text-blue-500" : "text-gray-500"}
          />
          {filesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {filesCount}
            </span>
          )}
        </Button>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="پیام خود را بنویسید..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          disabled={loading}
          className="mx-2"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              padding: "4px 8px",
              transition: "all 0.3s ease",
              backgroundColor: "white",
              "&:hover fieldset": {
                borderColor: "#5677BC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5677BC",
                boxShadow: "0 0 0 3px rgba(86,119,188,0.1)",
              },
            },
            "& .MuiInputBase-input": {
              padding: "12px 16px",
              fontSize: "0.95rem",
            },
          }}
        />
        <Button
          variant="contained"
          className="rounded-full flex items-center justify-center"
          sx={{
            bgcolor: "#5677BC",
            width: { xs: "42px", sm: "48px" },
            height: { xs: "42px", sm: "48px" },
            minWidth: { xs: "42px", sm: "48px" },
            borderRadius: "50%",
            ml: { xs: 1, sm: 2 },
            "&:hover": {
              bgcolor: "#02205F",
              transform: "translateY(-2px) scale(1.05)",
            },
            boxShadow: "0 4px 10px rgba(86,119,188,0.3)",
            transition: "all 0.2s ease",
          }}
          onClick={handleSendMessage}
          disabled={(newMessage.trim() === "" && filesCount === 0) || loading}
          component={motion.button}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <FaPaperPlane className="text-sm" />
            </motion.div>
          )}
        </Button>
      </Box>
    </>
  );
};

export default ChatInput;
