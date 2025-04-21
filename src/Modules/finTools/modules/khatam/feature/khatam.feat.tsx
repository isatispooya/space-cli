import { KhatamChart, KhatamDetails } from "../components";
import { MainLayout } from "@/layouts";
import { useKhatam } from "../hooks";

const KhatamFeat = () => {
  const { data: symbols } = useKhatam.useGetSymbols();
  console.log(symbols);
  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100 min-h-screen relative">
        <div className="flex-1 w-full h-full flex items-center justify-center p-6 ">
          <div className="w-full h-96">
            <KhatamChart
              data={[1, 2, 3, 4, 5]}
              labels={["1", "2", "3", "4", "5"]}
            />
          </div>
        </div>

        <KhatamDetails />
      </div>
    </MainLayout>
  );
};

export default KhatamFeat;
