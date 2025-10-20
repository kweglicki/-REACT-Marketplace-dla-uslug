import * as React from "react";
export function ListingCard({ title, city, price, currency, href }: { title:string; city:string; price:number; currency:string; href:string; }) {
return (
<a href={href} className="block rounded-2xl shadow p-4 hover:shadow-md transition bg-white">
<div className="font-semibold text-lg">{title}</div>
<div className="text-sm text-gray-600">{city}</div>
<div className="mt-2">{price} {currency}</div>
</a>
);
}