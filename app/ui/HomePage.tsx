"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useGetListingsQuery } from "app/packages/sdk/src/api";

export default function HomePage() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useGetListingsQuery({ q });

  return (
    <main className="min-h-[80vh]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Znajdź usługę w Twojej okolicy
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Rezerwuj sprawdzone usługi — szybko i bezpiecznie.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <TextField
                fullWidth
                variant="outlined"
                label="Czego szukasz?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                InputProps={{ className: "bg-white rounded-xl" }}
              />
              <Button
                onClick={() => (window.location.href = `/listings?q=${encodeURIComponent(q)}`)}
                variant="contained"
                className="!bg-white !text-indigo-700 !font-semibold !rounded-xl"
              >
                Szukaj
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Najpopularniejsze</h2>
          <a href="/listings" className="text-indigo-700 hover:underline text-sm">Zobacz wszystkie</a>
        </div>

        {isLoading ? (
          <div className="mt-6 text-gray-500">Ładowanie…</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data?.items ?? []).map((i) => (
              <a
                key={i.id}
                href={`/listings/${i.id}`}
                className="group bg-white rounded-2xl p-5 shadow hover:shadow-md transition"
              >
                <div className="aspect-[16/9] w-full rounded-xl bg-gray-100 mb-4 group-hover:bg-gray-200" />
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-600">{i.city} · {i.category}</div>
                <div className="mt-2 text-indigo-700 font-bold">
                  {i.pricePerUnit} {i.currency}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Świadczysz usługi?</h3>
            <p className="text-gray-600">Dołącz jako usługodawca i docieraj do nowych klientów.</p>
          </div>
          <Button href="/provider/onboarding" variant="contained" className="!rounded-xl">
            Dodaj ofertę
          </Button>
        </div>
      </section>
    </main>
  );
}