"use client";
import { useGetListingByIdQuery, useGetAvailabilityQuery, useCreateBookingMutation } from "@marketplace-sdk/api";
import { useState } from "react";
import { Button } from "@mui/material";


export default function ListingDetails({ id }: { id: string }) {
const { data: listing } = useGetListingByIdQuery(id);
const [range, setRange] = useState<{from:string;to:string}>();
const { data: slots } = useGetAvailabilityQuery(range ? { id, ...range } : skipArg());
const [createBooking, { isLoading }] = useCreateBookingMutation();


if (!listing) return <div className="p-6">Ładowanie…</div>;


const book = async (slotId: string) => {
const res = await createBooking({ listingId: id, slotId, guests: 1 }).unwrap();
// przekierowanie do płatności / potwierdzenia
window.location.href = `/bookings/new?bookingId=${res.id}`;
};


return (
<div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
<p className="text-gray-700 mb-4">{listing.description}</p>


{/* selector zakresu dat */}
<div className="mb-4">{/* ... */}</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{(slots ?? []).map((s) => (
<div key={s.id} className="rounded-xl border p-4 flex items-center justify-between">
<div>
<div className="font-medium">{new Date(s.start).toLocaleString()}</div>
<div className="text-sm text-gray-500">Miejsca: {s.remaining}/{s.capacity}</div>
</div>
<Button disabled={s.remaining === 0 || isLoading} onClick={() => book(s.id)} variant="contained">Rezerwuj</Button>
</div>
))}
</div>
</div>
);
}


function skipArg(): any { return { id: "", from: "", to: "" } as any; }