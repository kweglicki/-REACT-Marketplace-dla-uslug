"use client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "app/packages/sdk/src/api"; // lub poprawna ścieżka

const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}