import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "@/pages/auth/SignupPage";
import MainPage from "@/pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "!bg-gray-800 !text-white !rounded-xl !px-4 !py-2 !text-caption-02 !shadow-md",
          success: {
            iconTheme: {
              primary: "#30D158",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#FF4245",
              secondary: "#FFFFFF",
            },
          },
          duration: 3000,
        }}
      />
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<SignupPage />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
