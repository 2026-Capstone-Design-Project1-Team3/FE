import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalToaster from "@/components/GlobalToaster";
import { MainLayout } from "@/components/layouts/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import InterviewPreparePage from "@/pages/InterviewPreparePage";
import MainPage from "@/pages/MainPage";
import PresentationPreparePage from "@/pages/PresentationPreparePage";

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
          <Route
            element={<PresentationPreparePage />}
            path="/presentation/prepare"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
