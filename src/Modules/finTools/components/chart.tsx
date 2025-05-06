/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components";
import WaveEffect from "@/ui/wave";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { Symbol } from "../types";

type EChartsOption = echarts.EChartsOption;

interface ChartProps {
  title?: string;
  data: number[];
  labels: string[];
  symbols?: Symbol;
}

const ChartComponent = ({ data, labels, symbols }: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    const option: EChartsOption = {
      animation: true,
      animationDuration: 1500,
      animationEasing: 'elasticOut',
      tooltip: {
        trigger: "axis",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 0,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10,
        shadowOffsetY: 5,
        textStyle: {
          color: '#333',
          fontSize: 12,
        },
        formatter: (params: any) => {
          const dataIndex = params[0].dataIndex;
          return `<div style="padding: 8px 12px;">
            <div style="font-weight: bold; margin-bottom: 4px;">تاریخ: ${labels[dataIndex]}</div>
            <div>قیمت: <span style="color: #3B82F6; font-weight: bold;">${data[dataIndex].toLocaleString()} ریال</span></div>
          </div>`;
        },
        extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);',
      },
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
        axisLine: { lineStyle: { color: "#02205F", width: 1.5 } },
        axisTick: { show: false },
        axisLabel: {
          formatter: (value: string) => {
            return value.replace("1404-", "").replace("1403-", "");
          },
          color: '#666',
          fontSize: 11,
          margin: 12,
        },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(235, 238, 245, 0.8)', type: 'dashed' } },
        axisLabel: {
          formatter: (value: number) => value.toLocaleString(),
          color: '#666',
          fontSize: 11,
          margin: 16,
        },
      },
      series: [
        {
          name: symbols?.description || "قیمت",
          data,
          type: "line",
          smooth: true,
          showSymbol: false,
          emphasis: {
            focus: 'series',
            scale: true,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(59, 130, 246, 0.5)',
            }
          },
          areaStyle: {
            opacity: 0.5,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(59, 130, 246, 0.8)" },
                { offset: 0.5, color: "rgba(59, 130, 246, 0.3)" },
                { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
              ],
            },
          },
          lineStyle: {
            width: 4,
            cap: 'round',
            join: 'round',
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#3B82F6' },
                { offset: 1, color: '#1D4ED8' }
              ]
            },
            shadowColor: "rgba(59, 130, 246, 0.5)",
            shadowBlur: 15,
          },
          itemStyle: {
            color: "#3B82F6",
            borderWidth: 3,
            borderColor: "#fff",
            shadowColor: 'rgba(59, 130, 246, 0.5)',
            shadowBlur: 10,
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
  }, [data, labels, symbols]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }} />;
};

const Chart = ({ data, labels, symbols }: ChartProps) => (
  <div className="w-full h-full p-6 flex flex-col justify-end">
    <Card
      disableAnimation
      className="h-full w-full rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-white to-slate-50"
      contentClassName="h-full p-4 flex flex-col justify-end"
      content={
        <div className="flex flex-col">
          <div className="px-4 pt-2 pb-1">
            <h3 className="text-lg font-bold text-gray-800">{symbols?.symbol_detail?.name || "نمودار قیمت"}</h3>
            <p className="text-sm text-gray-500">تغییرات قیمت در دوره زمانی</p>
          </div>
          <ChartComponent data={data} labels={labels} symbols={symbols} />
        </div>
      }
      footerSlot={<WaveEffect color="blue" />}
    />
  </div>
);

export default Chart;
