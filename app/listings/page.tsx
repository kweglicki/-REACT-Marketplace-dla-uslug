import { Suspense } from "react";
import ListingsPage from "./ui/ListingsPage";


export const dynamic = "force-dynamic"; // SSR


export default async function Page({
  searchParams,
}: { searchParams: Promise<Record<string, string|undefined>> }) {
  const sp = await searchParams;
  return <ListingsPage initialQuery={{ q: sp.q }} />;
}