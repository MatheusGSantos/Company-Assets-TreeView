import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@lib/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(routes)} />;
    </QueryClientProvider>
  );
}

export default App;
