import { Metadata } from "next";
export const dynamicParams = false; // pełne SSG dla SEO
export async function generateStaticParams() {
const cities = await fetch(process.env.NEXT_PUBLIC_API_URL + "/cities", { cache: "force-cache" }).then(r=>r.json());
return cities.map((c: string) => ({ city: c }));
}
export default function CityPage({ params }: { params: { city: string } }) {
return <div className="container p-6">Oferty w mieście {params.city}</div>;
}