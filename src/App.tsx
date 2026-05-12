import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalToaster from "@/components/GlobalToaster";
import { Layout } from "@/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CalibrationPage from "@/pages/CalibrationPage";
import MainPage from "@/pages/MainPage";
import MyPage from "@/pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalToaster />
      <Routes>
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Layout />}>
          <Route element={<MainPage />} path="/" />
          <Route element={<MyPage />} path="/mypage" />
          <Route element={<CalibrationPage />} path="/calibration" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
