"use client";
import { useEffect } from "react";
import { useGetListingsQuery } from "app/packages/sdk/src/api";
import { useSearchStore } from "@/stores/useSearchStore";
import { Button } from "@mui/material";


export default function ListingsPage({ initialQuery }: { initialQuery:any }) {
  const { data, isLoading } = useGetListingsQuery({ q: initialQuery.q });
  if (isLoading) return <div className="p-6">Ładowanie…</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
      {data?.items.map(i => (
        <a key={i.id} href={`/listings/${i.id}`} className="rounded-xl shadow p-4 bg-white">
          <div className="font-semibold">{i.title}</div>
          <div className="text-sm text-gray-600">{i.city} · {i.category}</div>
          <div className="mt-2">{i.pricePerUnit} {i.currency}</div>
        </a>
      ))}
    </div>
  );
}