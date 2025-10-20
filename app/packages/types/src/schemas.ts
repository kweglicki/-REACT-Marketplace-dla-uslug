import { z } from "zod";


export const UserSchema = z.object({
id: z.string().uuid(),
name: z.string().min(1),
email: z.string().email(),
role: z.enum(["guest","client","provider","admin"]).default("client"),
avatarUrl: z.string().url().optional(),
});
export type User = z.infer<typeof UserSchema>;


export const ListingSchema = z.object({
id: z.string(),                 // było: z.string().uuid()
title: z.string().min(3),
description: z.string().min(3).optional(), // tymczasowo optional
city: z.string().min(2),
category: z.string().min(2),
pricePerUnit: z.number().nonnegative(),
currency: z.string().length(3),
rating: z.number().min(0).max(5).default(0),
images: z.array(z.string().url()).default([]),
providerId: z.string().optional(),         // tymczasowo optional
});


export const AvailabilitySlotSchema = z.object({
id: z.string().uuid(),
start: z.string().datetime(),
end: z.string().datetime(),
capacity: z.number().int().positive(),
remaining: z.number().int().nonnegative(),
});
export type AvailabilitySlot = z.infer<typeof AvailabilitySlotSchema>;


export const BookingSchema = z.object({
id: z.string().uuid(),
listingId: z.string().uuid(),
userId: z.string().uuid(),
slotId: z.string().uuid(),
guests: z.number().int().positive().default(1),
status: z.enum(["pending","confirmed","cancelled"]),
amount: z.number().nonnegative(),
currency: z.string().length(3),
createdAt: z.string().datetime(),
});
export type Booking = z.infer<typeof BookingSchema>;


export const ReviewSchema = z.object({
id: z.string().uuid(),
listingId: z.string().uuid(),
userId: z.string().uuid(),
rating: z.number().int().min(1).max(5),
comment: z.string().min(3),
createdAt: z.string().datetime(),
});
export type Review = z.infer<typeof ReviewSchema>;


export const PaginationSchema = z.object({
page: z.number().int().nonnegative(),
size: z.number().int().positive(),
total: z.number().int().nonnegative(),
});