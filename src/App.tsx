import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalToaster from "@/components/GlobalToaster";
import SignupPage from "@/pages/auth/SignupPage";
import MainPage from "@/pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalToaster />
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<SignupPage />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
