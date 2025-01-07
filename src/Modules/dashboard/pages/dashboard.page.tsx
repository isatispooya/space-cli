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
            <Grid
              container
              spacing={3}
              sx={{ height: { xs: "auto", md: "100%" } }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: {
                    xs: "300px",
                    sm: "24vh",
                    md: "24vh",
                  },
                }}
              >
                {sliderData.length > 0 && (
                  <DashboardSlider slides={sliderData} />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: {
                    xs: "auto",
                    md: "calc(76vh - 104px)",
                  },
                }}
              >
                <Grid container spacing={3} sx={{ height: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                      height: {
                        xs: "400px",
                        md: "100%",
                      },
                    }}
                  >
                    <DashboardChart />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      height: {
                        xs: "300px",
                        md: "100%",
                      },
                    }}
                  >
                    <div style={{ height: "100%" }}>
                      <DashboardMarketingStat />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: {
                xs: "auto",
                sm: "auto",
                md: "calc(100vh - 104px)",
              },
            }}
          >
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  height: {
                    xs: "300px",
                    sm: "300px",
                    md: "33.33%",
                  },
                }}
              >
                <DashboardCrowdStat />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  height: {
                    xs: "300px",
                    sm: "300px",
                    md: "33.33%",
                  },
                }}
              >
                <DashboardBimeStat />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  height: {
                    xs: "300px",
                    sm: "300px",
                    md: "33.33%",
                  },
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
