import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../components/skeletons/Loader";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../utils/geoData";

const GeographyPage = () => {
  const [geography, setGeography] = useState(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/client/geography`
        );

        setGeography(responseData.locations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div>
      <div className="flex flex-col justify-center pb-5">
        <p className="header">geography</p>
        <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
          See users for different countries
        </p>
      </div>

      {geography === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      {geography !== null ? (
        <div className="h-[75vh] w-full border border-[#8E44AD]">
          <ResponsiveChoropleth
            data={geography}
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#ffedc2",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#21295c",
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

export default GeographyPage;
