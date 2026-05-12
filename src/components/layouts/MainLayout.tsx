import { Outlet } from "react-router-dom";

import { Footer } from "@/shared/ui/MainSection/Footer/Footer";
import { Header } from "@/shared/ui/MainSection/Header/Header";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-900/5 font-sans text-gray-900">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
