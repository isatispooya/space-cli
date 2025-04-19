import { Button, Card } from "@/components";
import WaveEffect from "@/ui/wave";
import * as echarts from "echarts";
import KHatamPic from "../../../../../assets/khatam.png";
import { useEffect, useRef } from "react";

import { MainLayout } from "@/layouts";

type EChartsOption = echarts.EChartsOption;

interface ChartProps {
  title?: string;
  data: number[];
  labels: string[];
}

const Chart = ({
  title = "صندوق سرمایه‌گذاری خاتم ایساتیس پویا",
  data = [23600, 23700, 23800, 23900, 24000, 24100, 24200], 
  labels = [
    "شنبه",
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ],
}: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      const option: EChartsOption = {
        tooltip: { trigger: "axis" },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: {
          type: "category",
          data: labels,
          boundaryGap: false,
          axisLine: { lineStyle: { color: "#ddd" } },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          splitLine: { lineStyle: { color: "#f5f5f5" } },
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              opacity: 0.3,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(231, 29, 54, 0.6)" },
                  { offset: 1, color: "rgba(231, 29, 54, 0.05)" },
                ],
              },
            },
            lineStyle: {
              width: 3,
              color: "#e71d36",
              shadowColor: "rgba(231, 29, 54, 0.3)",
              shadowBlur: 10,
            },
            itemStyle: {
              color: "#e71d36",
              borderWidth: 2,
              borderColor: "#fff",
            },
          },
        ],
      };
      chartInstance.setOption(option);
    }

    const handleResize = () => chartInstance?.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      chartInstance?.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, labels]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row bg-white">

        <div className="md:w-1/2 w-full flex flex-col justify-center p-10 space-y-6">
          <div className="flex items-center gap-2">
          <img src={KHatamPic} alt="KHatam" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-gray-800">
            صندوق سرمایه‌گذاری{" "}
            <span className="text-red-600">خاتم ایساتیس پویا</span>
          </h1>
          <br/>
        </div>
        <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
          صندوق با درآمد ثابت «خاتم» یکی از پر بازده‌ترین صندوق‌های با درآمد
          ثابت کشور در ماه‌های گذشته بوده است.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button
            variant="outline"
            className="px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-gray-100"
          >
            مشاوره
          </Button>
          <Button className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-white shadow-lg">
            خرید
          </Button>
        </div>
      </div>


      <div className="md:w-1/2 w-full h-1/2 md:h-full p-4">
        <Card
          disableAnimation={true}
          className="h-full bg-white rounded-xl shadow-lg"
          contentClassName="h-full p-0"
          content={
            <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
          }
          footerSlot={<WaveEffect color="red" />}
        />
      </div>
    </div>
    </MainLayout>
  );
};

export default Chart;
