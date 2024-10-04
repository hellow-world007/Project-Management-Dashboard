import { ResponsiveLine } from "@nivo/line";
import { useContext, useMemo } from "react";
import { AppContext } from "../../shared/context/app-context";

const OverviewChart = ({ isDashboard = false, selected }) => {
  const { salesData: stats } = useContext(AppContext);

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!stats || !stats.monthlyData) return [[], []];

    const { monthlyData } = stats;
    const totalSalesLine = {
      id: "totalSales",
      color: "#FFD700",
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: "#FF6F61",
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [stats]);

  return (
    <div
      className={`${
        isDashboard ? "h-96" : "h-[75vh]"
      } w-full border border-[#8E44AD]`}
    >
      <ResponsiveLine
        data={selected === "Sales" ? totalSalesLine : totalUnitsLine}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#8E44AD",
              },
            },
            legend: {
              text: {
                fill: "#FF6F61",
              },
            },
            ticks: {
              line: {
                stroke: "#FFD700",
                strokeWidth: 1,
              },
              text: {
                fill: "#8E44AD",
              },
            },
          },
          legends: {
            text: {
              fill: "#8E44AD",
            },
          },
          tooltip: {
            container: {
              color: "#4d547d",
            },
          },
        }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            if (isDashboard) return v.slice(0, 3);
            return v;
          },
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard
            ? ""
            : `Total ${selected === "Sales" ? "Revenue" : "Units"} for Year`,
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 30,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default OverviewChart;
