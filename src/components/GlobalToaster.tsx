import { Toaster } from "react-hot-toast";

export default function GlobalToaster() {
  return (
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
  );
}
