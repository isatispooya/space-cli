
import {
  Box,
  Typography,
  Grid,
  Collapse,
  Divider,
} from "@mui/material";
import {

  Badge,
  Computer,
  Web,
  DeviceHub,

  Info,
} from "@mui/icons-material";
import { UsersTimeflowType } from "../types/userstimeflow.type";
            
const CollapseComponent = ({ isExpanded, item }: { isExpanded: boolean, item: UsersTimeflowType }) => {
  return (
    <Collapse in={isExpanded}>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Info sx={{ mr: 1, fontSize: 18 }} />
          اطلاعات بیشتر
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Badge
                sx={{ color: "#5677BC", mr: 1, fontSize: 18 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                شناسه کاربری:
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {item.user?.username}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Computer
                sx={{ color: "#5677BC", mr: 1, fontSize: 18 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                سیستم عامل:
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {item.os_type?.includes("Windows")
                    ? "ویندوز"
                    : item.os_type?.includes("Mac")
                    ? "مک"
                    : "نامشخص"}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Web
                sx={{ color: "#5677BC", mr: 1, fontSize: 18 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                مرورگر:
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {item.browser?.includes("Chrome")
                    ? "کروم"
                    : item.browser?.includes("Firefox")
                    ? "فایرفاکس"
                    : item.browser?.includes("Safari")
                    ? "سافاری"
                    : "نامشخص"}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <DeviceHub
                sx={{ color: "#5677BC", mr: 1, fontSize: 18 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                آدرس IP:
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {item.ip_address}
                </Typography>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <DeviceHub
                sx={{ color: "#5677BC", mr: 1, fontSize: 18 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                نوع دستگاه:
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {item.device_type?.includes("Mobile")
                    ? "موبایل"
                    : "کامپیوتر"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
};

export default CollapseComponent;


