import FundCard from "../components/funds.card";

export const FundsDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top row with Khatam (larger) and the other two funds */}
        <div className="md:col-span-1">
          <FundCard
            type="exir"
            value={500000}
            change={7500}
            changePercentage={1.8}
            size="medium"
          />
        </div>
        <div className="md:col-span-1">
          <FundCard
            type="termeh"
            value={750000}
            change={-5000}
            changePercentage={-1.2}
            size="medium"
          />
        </div>
        <div className="md:col-span-1">
          <FundCard
            type="khatam"
            value={1250000}
            change={15000}
            changePercentage={2.5}
            size="medium"
          />
        </div>
      </div>

      {/* Bottom row with Mosharkat alone */}
      <div className="mt-2">
        <FundCard
          type="mosharkat"
          value={950000}
          change={12000}
          changePercentage={1.5}
          size="medium"
        />
      </div>
    </div>
  );
};

export default FundsDashboard;
