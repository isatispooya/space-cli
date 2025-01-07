import { Container, Grid } from "@mui/material";
import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItem } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import { useMemo } from "react";

import { DashboardMarketingStat } from "../components";
import { useDashboard } from "../hooks";
import DashboardCrowdStat from "../components/dashboardCrowd.stat";
import DashboardBimeStat from "../components/dashboardBime.stat";
import DashboardBorsStat from "../components/dashboardBors.stat";

const DashboardPage = () => {
  const { data: shortcuts } = useDashboard.useGetShortcuts();

  const sliderData = useMemo(
    () =>
      shortcuts?.map((shortcut: SlideItem) => ({
        id: shortcut.id,
        picture: shortcut.picture,
        title: shortcut.title,
        link: shortcut.link,
      })) || [],
    [shortcuts]
  );

  return (
    <MainLayout>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: { xs: "auto", md: "calc(100vh - 80px)" },
          py: { xs: 1, sm: 2 },
        }}
      >
        <Grid container spacing={3} sx={{ height: "100%" }}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3} sx={{ height: "100%" }}>
              <Grid item xs={12} sx={{ height: "24vh" }}>
                {sliderData.length > 0 && (
                  <DashboardSlider slides={sliderData} />
                )}
              </Grid>
              <Grid item xs={12} sx={{ height: "calc(100% - 24vh - 24px)" }}>
                <Grid container spacing={3} sx={{ height: "100%" }}>
                  <Grid item xs={12} md={8} sx={{ height: "100%" }}>
                    <DashboardChart />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ height: "100%" }}>
                    <div style={{ height: "100%" }}>
                      <DashboardMarketingStat />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                sx={{
                  flex: 1,
                  minHeight: { xs: "200px", md: "calc(30vh - 16px)" },
                }}
              >
                <DashboardCrowdStat />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                sx={{
                  flex: 1,
                  minHeight: { xs: "200px", md: "calc(30vh - 16px)" },
                }}
              >
                <DashboardBimeStat />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                sx={{
                  flex: 1,
                  minHeight: { xs: "200px", md: "calc(30vh - 16px)" },
                }}
              >
                <DashboardBorsStat />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default DashboardPage;
