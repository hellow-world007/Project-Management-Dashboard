import BreakdownChart from "../../components/sales/BreakdownChart";

const BreakdownPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center pb-5">
        <p className="header">breakdown</p>
        <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
          Breakdown of sales by category
        </p>
      </div>
      <BreakdownChart />
    </div>
  );
};

export default BreakdownPage;
