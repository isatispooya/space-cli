import { Container, Grid } from "@mui/material";
import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItem } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import { useMemo } from "react";

import { DashboardMarketingStat } from "../components";
import { useDashboard } from "../hooks";
import DashboardCrowdStat from "../components/dashboardCrowd.stat";
import DashboardBimeStat from "../components/dashboardBime.stat";

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
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ height: "100%" }}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sx={{ height: "25vh" }}>
                {sliderData.length > 0 && (
                  <DashboardSlider slides={sliderData} />
                )}
              </Grid>
              <Grid item xs={12} sx={{ height: "65vh" }}>
                <DashboardChart />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  height: { xs: "200px", md: "calc(30vh - 16px)" },
                }}
              >
                <DashboardMarketingStat />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  height: { xs: "200px", md: "calc(30vh - 16px)" },
                }}
              >
                <DashboardCrowdStat />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{ height: { xs: "200px", md: "calc(30vh - 16px)" } }}
              >
                <DashboardBimeStat />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default DashboardPage;
