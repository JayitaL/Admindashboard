import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TablesProvider } from "./contexts/TablesContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <TablesProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TablesProvider>
  );
}