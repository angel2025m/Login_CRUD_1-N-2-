import GraficaBarras from "./graficas/GraficaBarras";
import GraficaAnillos from "./graficas/GraficaAnillo";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="w-full" style={{height: '300px'}}>
              <GraficaBarras />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="w-full h-80 md:h-96">
              <GraficaAnillos />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;