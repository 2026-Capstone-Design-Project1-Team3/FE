import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalToaster from "@/components/GlobalToaster";
import { MainLayout } from "@/components/layouts/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CalibrationPage from "@/pages/CalibrationPage";
import FolderDetailPage from "@/pages/FolderDetailPage";
import InterviewPreparePage from "@/pages/InterviewPreparePage";
import InterviewReportPage from "@/pages/InterviewReportPage";
import InterviewResultPage from "@/pages/InterviewResultPage";
import MainPage from "@/pages/MainPage";
import MyPage from "@/pages/MyPage";
import PresentationPreparePage from "@/pages/PresentationPreparePage";
import PresentationReportPage from "@/pages/PresentationReportPage";
import PresentationResultPage from "@/pages/PresentationResultPage";
import ResultPage from "@/pages/ResultPage";

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
          <Route
            element={<FolderDetailPage />}
            path="/report/presentation/:folderId"
          />
          <Route
            element={<FolderDetailPage />}
            path="/report/interview/:folderId"
          />
          <Route element={<ResultPage />} path="/report" />
          <Route
            element={<PresentationResultPage />}
            path="/report/presentation"
          />
          <Route element={<InterviewResultPage />} path="/report/interview" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
