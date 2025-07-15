import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/Routes.jsx";
import AuthProvider from "./context/authcontext/AuthProvider.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Step 1: Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Step 2: Provide the client to your app */}
    <QueryClientProvider client={queryClient}>
      {/*  AuthProvider (must be inside if it uses useQuery) */}
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        {/* ✅ Toast container for react-hot-toast */}
        <Toaster position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
