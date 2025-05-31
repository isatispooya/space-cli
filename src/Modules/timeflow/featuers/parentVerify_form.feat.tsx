/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTimeflow } from "../hooks";
import { LoaderLg } from "../../../components";
import moment from "moment-jalaali";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TimePicker } from "@mui/x-date-pickers";
import { Paper, Box, Typography, alpha, Card, Chip, Grid } from "@mui/material";
import { List, Person } from "@mui/icons-material";
import CollapseComponent from "../components/Collapse";
import dayjs from "dayjs";
import ActionButton from "../components/actionButton";

const typeTranslator = (type: string): string => {
  switch (type) {
    case "login":
      return "ورود";
    case "logout":
      return "خروج";
    case "leave":
      return "مرخصی";
    case "end-leave":
      return "پایان مرخصی";
    case "start-mission":
      return "شروع ماموریت";
    case "end-mission":
      return "پایان ماموریت";
    default:
      return type;
  }
};

const statusTranslator = (status: string): string => {
  switch (status) {
    case "approved":
      return "تأیید شده";
    case "rejected":
      return "رد شده";
    case "pending":
      return "در انتظار تأیید";
    default:
      return status;
  }
};

const ParentVerifyForm = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<{
    [id: number]: dayjs.Dayjs;
  }>({});

  const { data, isLoading, refetch } = useTimeflow.useGetTimeflowSenior();
  const { mutate } = useTimeflow.useUpdateTimeflowSenior();

  const mappedData = Array.isArray(data)
    ? data.map((item: any) => ({
        ...item,
        formattedDate: moment(item.time_user).format("jYYYY/jMM/jDD"),
        formattedTime: moment(item.time_user).format("HH:mm:ss"),
        typePersian: typeTranslator(item.type),
        statusSelf: statusTranslator(item.status_self || "pending"),
        statusParent: statusTranslator(item.status_parent || "pending"),
      }))
    : [];

  if (isLoading) {
    return <LoaderLg />;
  }

  const toggleDetails = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تأیید شده":
        return { color: "#4CAF50", bgcolor: "#E8F5E9" };
      case "رد شده":
        return { color: "#F44336", bgcolor: "#FFEBEE" };
      default:
        return { color: "#FF9800", bgcolor: "#FFF3E0" };
    }
  };

  const handleApprove = (
    id: number,
    originalDateTime: string,
    selectedTime: dayjs.Dayjs
  ) => {
    const datePart = dayjs(originalDateTime).format("YYYY-MM-DD");
    const timePart = selectedTime.format("HH:mm:ss");
    const fullDateTime = `${datePart}T${timePart}`;

    mutate(
      {
        id,
        data: { status_parent: "approved", time_parent: fullDateTime },
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleReject = (
    id: number,
    originalDateTime: string,
    selectedTime: dayjs.Dayjs
  ) => {
    const datePart = dayjs(originalDateTime).format("YYYY-MM-DD");
    const timePart = selectedTime.format("HH:mm:ss");
    const fullDateTime = `${datePart}T${timePart}`;

    mutate(
      {
        id,
        data: { status_parent: "rejected", time_parent: fullDateTime },
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (data && data.length === 0) {
    return (
      <div>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", position: "relative", zIndex: 1 }}
        >
          هیچ ترددی یافت نشد
        </Typography>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="log-list"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="w-full mx-auto"
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(to right bottom, #ffffff, #f8f9ff)",
            border: "1px solid rgba(86, 119, 188, 0.1)",
            mb: 4,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #5677BC, #3f5ca8)",
              p: 3,
              color: "white",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: -20,
                top: -20,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: alpha("#ffffff", 0.1),
                zIndex: 0,
              }}
            />

            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "bold", position: "relative", zIndex: 1 }}
            >
              <List sx={{ mr: 1, verticalAlign: "middle", fontSize: 28 }} />
              لیست تردد‌ها
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {mappedData.map((item: any) => {
                const statusSelfStyle = getStatusColor(item.statusSelf);
                const statusParentStyle = getStatusColor(item.statusParent);
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <Card
                    key={item.id}
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={2} alignItems="center">
                        {/* User Info */}
                        <Grid item xs={12} md={3}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 1.5,
                              borderRadius: 2,
                              mb: { xs: 2, md: 0 },
                            }}
                          >
                            <Person
                              sx={{
                                color: "#5677BC",
                                mr: 1,
                                fontSize: 24,
                                borderRadius: "30px",
                              }}
                            />
                            <Box>
                              <Typography variant="body1" fontWeight="bold">
                                {item.user?.first_name} {item.user?.last_name}
                              </Typography>
                              {item.typePersian}
                            </Box>
                          </Box>
                        </Grid>

                        {/* Date & Time - Prominent */}
                        <Grid item xs={6} sm={4} md={3}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha("#5677BC", 0.05),
                              height: "100%",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="body1" fontWeight="bold">
                                {item.formattedDate}
                              </Typography>
                            </Box>

                            <TimePicker
                              label="ساعت"
                              value={
                                selectedTimes[item.id] || dayjs(item.time_user)
                              }
                              onChange={(newValue) => {
                                if (newValue) {
                                  setSelectedTimes((prev) => ({
                                    ...prev,
                                    [item.id]: newValue,
                                  }));
                                }
                              }}
                              sx={{
                                width: "100%",
                                direction: "ltr",
                                "& .MuiInputBase-root": {
                                  borderRadius: "12px",
                                  pl: 5,
                                },
                              }}
                            />
                          </Box>
                        </Grid>

                        {/* Status Chips */}
                        <Grid item xs={12} sm={4} md={3}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              label={`شخصی: ${item.statusSelf}`}
                              sx={{
                                color: statusSelfStyle.color,
                                bgcolor: statusSelfStyle.bgcolor,
                                fontWeight: "bold",
                                width: "100%",
                                py: 0.5,
                              }}
                            />

                            <Chip
                              label={`مدیر: ${item.statusParent}`}
                              sx={{
                                color: statusParentStyle.color,
                                bgcolor: statusParentStyle.bgcolor,
                                fontWeight: "bold",
                                width: "100%",
                                py: 0.5,
                              }}
                            />
                          </Box>
                        </Grid>

                        {/* Action Buttons */}
                        <ActionButton
                          item={item}
                          handleApprove={handleApprove}
                          handleReject={handleReject}
                          toggleDetails={toggleDetails}
                          isExpanded={isExpanded}
                          selectedTimes={selectedTimes}
                        />
                      </Grid>

                      <CollapseComponent isExpanded={isExpanded} item={item} />
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

export default ParentVerifyForm;
