import { useContext, useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import Loader from "../../components/skeletons/Loader";
import { AppContext } from "../../shared/context/app-context";

const MonthlyPage = () => {
  const { salesData: data } = useContext(AppContext);

  const [formattedData] = useMemo(() => {
    if (!data || !data.monthlyData) return [[], []];

    const { monthlyData } = data;
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

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data]);

  return (
    <div>
      <div className="flex flex-col justify-center pb-5">
        <p className="header">monthly</p>
        <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
          See your monthly sales
        </p>
      </div>

      {data === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      {data !== null ? (
        <div className="h-[75vh] w-full border border-[#8E44AD]">
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
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
            ]}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MonthlyPage;
