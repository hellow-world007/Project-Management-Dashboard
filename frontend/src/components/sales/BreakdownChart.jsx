import { useContext } from "react";
import { AppContext } from "../../shared/context/app-context";
import { ResponsivePie } from "@nivo/pie";
import Loader from "../skeletons/Loader";

const BreakdownChart = ({ isDashboard = false }) => {
  const { salesData: data } = useContext(AppContext);
  const colors = ["#8E44AD", "#FF6F61", "#FFD700", "#4d547d"];

  if (!data || !data.salesByCategory) return [[], []];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <div>
      {data === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      {data !== null ? (
        <div
          className={`w-full relative border border-[rgb(142,68,173)] ${
            isDashboard ? "h-96" : "h-[75vh]"
          }`}
        >
          <ResponsivePie
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
            colors={{ datum: "data.color" }}
            margin={
              isDashboard
                ? { top: 40, right: 80, bottom: 100, left: 50 }
                : { top: 40, right: 80, bottom: 80, left: 80 }
            }
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={!isDashboard}
            arcLinkLabelsTextColor={"#FF6F61"}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: isDashboard ? 20 : 0,
                translateY: isDashboard ? 50 : 56,
                itemsSpacing: 0,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#FF6F61",
                    },
                  },
                ],
              },
            ]}
          />

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-center pointer-events-none ${
              isDashboard ? "hidden" : ""
            }`}
          >
            {!isDashboard && "Total:"} ${data.yearlySalesTotal}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BreakdownChart;
