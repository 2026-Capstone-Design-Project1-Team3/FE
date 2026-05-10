import { Outlet } from "react-router-dom";

import { Footer } from "./shared/ui/Footer/Footer";
import { Header } from "./shared/ui/Header/Header";

export const Layout = () => {
  const bgColor = "bg-primary-900/5";
  return (
    <div>
      <Header logoText="Silent Mentor" />

      <main className={bgColor}>
        <Outlet />
      </main>

      <Footer className={bgColor} />
    </div>
  );
};
