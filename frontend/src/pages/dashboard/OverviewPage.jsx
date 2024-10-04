import { useState } from "react";
import OverviewChart from "../../components/sales/OverviewChart";

const OverviewPage = () => {
  const [selectedOption, setSelectedOption] = useState("Units");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col justify-center pb-5">
        <p className="header">overview</p>
        <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
          See total overview
        </p>
      </div>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="select select-info text-xl text-black dark:text-white bg-[#e0e0e0] dark:bg-[#21295c]"
      >
        <option value="Units" className="p-4 text-xl font-inter">
          Units
        </option>
        <option value="Sales" className="p-4 text-xl font-inter">
          Sales
        </option>
      </select>
      <div className="pt-5">
        <OverviewChart selected={selectedOption} />
      </div>
    </div>
  );
};

export default OverviewPage;
