import { Container, Grid } from "@mui/material";
import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItem } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import DashboardStats, { StatsProps } from "../components/dashboard.stats";
import { IoPersonOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { useShortcuts } from "../hooks";
import { useMemo } from "react";

const DashboardPage = () => {
  const { data: shortcuts } = useShortcuts();

  console.log(shortcuts);

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

  const statsData: StatsProps[] = [
    {
      title: "کاربران دعوت شده",
      value: "2,534",
      icon: <IoPersonOutline className="w-6 h-6" />,
      change: 12,
      changeText: "دعوت کردن ",
      trend: "up" as const,
      iconColor: "text-blue-600",
      route: "/marketing",
    },
    {
      title: "درآمد کل",
      value: "۳,۶۵۴,۰۰۰ تومان",
      icon: <BiDollar className="w-6 h-6" />,
      change: -2.5,
      changeText: "کاهش درآمد",
      trend: "down" as const,
      iconColor: "text-green-600",
    },
    {
      title: "سفارشات",
      value: "1,423",
      icon: <BsCart className="w-6 h-6" />,
      change: 8.2,
      changeText: "افزایش سفارشات",
      trend: "up" as const,
      iconColor: "text-purple-600",
    },
  ];

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
              {statsData.map((stat, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={4}
                  md={12}
                  sx={{
                    height: { xs: "200px", md: "calc(30vh - 16px)" },
                  }}
                >
                  <DashboardStats {...stat} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default DashboardPage;
