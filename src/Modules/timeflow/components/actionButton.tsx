import { Grid } from "@mui/material";
import { CheckCircle, ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { alpha } from "@mui/material";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { UsersTimeflowType } from "../types/userstimeflow.type";


  
const ActionButton = ({
    item,
  handleApprove,
  handleReject,
  toggleDetails,
  isExpanded,
  selectedTimes,
}: {
  item: UsersTimeflowType;
  handleApprove: (id: number, time_user: string, selectedTime: dayjs.Dayjs) => void;
  handleReject: (id: number, time_user: string, selectedTime: dayjs.Dayjs) => void;
  toggleDetails: (id: number) => void;
  isExpanded: boolean;
  selectedTimes: { [id: number]: dayjs.Dayjs };


}) => {
  return (
    <Grid item xs={12} md={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Tooltip title="تأیید" arrow>
          <IconButton
            onClick={() =>
              handleApprove(
                item.id,
                item.time_user,
                selectedTimes[item.id] || dayjs(item.time_user)
              )
            }
            sx={{
              color: "#4CAF50",
              bgcolor: alpha("#4CAF50", 0.1),
              "&:hover": {
                bgcolor: alpha("#4CAF50", 0.2),
              },
            }}
            size="small"
          >
            <CheckCircle />
          </IconButton>
        </Tooltip>

        <Tooltip title="رد" arrow>
          <IconButton
            onClick={() =>
              handleReject(
                item.id,
                item.time_user,
                selectedTimes[item.id] || dayjs(item.time_user)
              )
            }
            sx={{
              color: "#F44336",
              bgcolor: alpha("#F44336", 0.1),
              "&:hover": {
                bgcolor: alpha("#F44336", 0.2),
              },
            }}
            size="small"
          >
            <Cancel />
          </IconButton>
        </Tooltip>

        <Tooltip title={isExpanded ? "بستن جزئیات" : "مشاهده جزئیات"} arrow>
          <IconButton
            onClick={() => toggleDetails(item.id)}
            sx={{
              color: "#5677BC",
              bgcolor: alpha("#5677BC", 0.1),
              "&:hover": {
                bgcolor: alpha("#5677BC", 0.2),
              },
            }}
            size="small"
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Tooltip>
      </Box>
    </Grid>
  );
};

export default ActionButton;
