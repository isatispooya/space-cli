import { Card } from "@/components";
import WaveEffect from "@/ui/wave";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

type EChartsOption = echarts.EChartsOption;

interface ChartProps {
  title?: string;
  data: number[];
  labels: string[];
}

const ChartComponent = ({ data, labels }: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    const option: EChartsOption = {
      tooltip: { trigger: "axis" },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: labels,
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#02205F" } },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "#f5f5f5" } },
      },
      series: [
        {
          data,
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
                { offset: 0, color: "rgba(252, 187, 1, 0.6)" },
                { offset: 1, color: "rgba(252, 187, 1, 0.05)" },
              ],
            },
          },
          lineStyle: {
            width: 3,
            color: "#FCBB01",
            shadowColor: "rgba(252, 187, 1, 0.3)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#FCBB01",
            borderWidth: 2,
            borderColor: "#fff",
          },
        },
      ],
    };
    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, labels]);

  return <div ref={chartRef} style={{ width: "100%", height: "290%" }} />;
};

const Chart = ({ data, labels }: ChartProps) => (
  <div className="w-full h-full p-4 flex flex-col justify-end">
    <Card
      disableAnimation
      className="h-full w-full rounded-xl shadow-lg"
      contentClassName="h-full p-0 flex flex-col justify-end"
      content={<ChartComponent data={data} labels={labels} />}
      footerSlot={<WaveEffect color="blue" />}
    />
  </div>
);

export default Chart;
