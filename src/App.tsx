import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalToaster from "@/components/GlobalToaster";
import { MainLayout } from "@/components/layouts/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CalibrationPage from "@/pages/CalibrationPage";
import InterviewPreparePage from "@/pages/InterviewPreparePage";
import InterviewReportPage from "@/pages/InterviewReportPage";
import MainPage from "@/pages/MainPage";
import MyPage from "@/pages/MyPage";
import PresentationPreparePage from "@/pages/PresentationPreparePage";
import PresentationReportPage from "@/pages/PresentationReportPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalToaster />
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<MainLayout />}>
          <Route element={<MainPage />} path="/" />
          <Route element={<InterviewPreparePage />} path="/interview/prepare" />
          <Route element={<InterviewReportPage />} path="/interview/report" />
          <Route
            element={<PresentationPreparePage />}
            path="/presentation/prepare"
          />
          <Route
            element={<PresentationReportPage />}
            path="/presentation/report"
          />
          <Route element={<MyPage />} path="/my" />
          <Route element={<CalibrationPage />} path="/my/calibration" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
