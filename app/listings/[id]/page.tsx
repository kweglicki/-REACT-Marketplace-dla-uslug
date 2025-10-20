import ListingDetails from "./ui/ListingDetails";
export const dynamic = "force-dynamic";
export default function Page({ params }: { params: { id: string } }) {
  return <ListingDetails id={params.id} />;
}