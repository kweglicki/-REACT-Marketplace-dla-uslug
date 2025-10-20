import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import {
ListingSchema, AvailabilitySlotSchema, BookingSchema,
} from "@marketplace-types/schemas";


const baseQuery = fetchBaseQuery({
baseUrl: process.env.NEXT_PUBLIC_API_URL,
prepareHeaders: (headers) => {
if (typeof window !== "undefined") {
const token = localStorage.getItem("accessToken");
if (token) headers.set("Authorization", `Bearer ${token}`);
}
return headers;
},
});


export const api = createApi({
reducerPath: "api",
baseQuery,
tagTypes: ["Listing","Availability","Booking","Review"],
endpoints: (build) => ({
getListings: build.query<
{ items: z.infer<typeof ListingSchema>[]; total: number },
{ page?: number; size?: number; q?: string; city?: string; category?: string }
>({
query: (params) => ({ url: "/listings", params }),
providesTags: (res) => res?.items
? [...res.items.map((l) => ({ type: "Listing" as const, id: l.id })), { type: "Listing", id: "LIST" }]
: [{ type: "Listing", id: "LIST" }],
transformResponse: (res: unknown) => {
const Items = z.object({
items: z.array(ListingSchema),
total: z.number().int().nonnegative(),
});
return Items.parse(res);
},
}),


getListingById: build.query<z.infer<typeof ListingSchema>, string>({
query: (id) => `/listings/${id}`,
providesTags: (r, e, id) => [{ type: "Listing", id }],
transformResponse: (res: unknown) => ListingSchema.parse(res),
}),


getAvailability: build.query<z.infer<typeof AvailabilitySlotSchema>[], { id: string; from: string; to: string }>({
query: ({ id, from, to }) => ({ url: `/listings/${id}/availability`, params: { from, to } }),
providesTags: (r, e, { id }) => [{ type: "Availability", id }],
transformResponse: (res: unknown) => z.array(AvailabilitySlotSchema).parse(res),
}),


createBooking: build.mutation<z.infer<typeof BookingSchema>, { listingId: string; slotId: string; guests: number }>({
query: (body) => ({ url: "/bookings", method: "POST", body }),
invalidatesTags: (r) => r ? [{ type: "Booking", id: r.id }] : [],
transformResponse: (res: unknown) => BookingSchema.parse(res),
}),
}),
});


export const {
useGetListingsQuery,
useGetListingByIdQuery,
useGetAvailabilityQuery,
useCreateBookingMutation,
} = api;