import { AppRoutes } from "./routes/AppRoutes.jsx";
import { Toaster } from "sonner";
export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        offset="50%"
        richColors
        closeButton
        duration={2000}
        expand={true}
      />

      <AppRoutes />
    </>
  );
}
