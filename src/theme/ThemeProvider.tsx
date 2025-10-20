"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
palette: { mode: "light" },
shape: { borderRadius: 12 },
});


export default function AppTheme({ children }: { children: React.ReactNode }) {
return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}