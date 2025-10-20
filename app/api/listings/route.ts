export async function GET() {
  return Response.json({
    items: [
      {
        id: "7d7e6b7b-3c6f-4a8e-9d0b-1f2a3b4c5d6e", // ✅ UUID
        title: "Serwis rowerów",
        description: "Przegląd i regulacja napędu.",
        city: "Warszawa",
        category: "Usługi",
        pricePerUnit: 120,
        currency: "PLN",
        rating: 4.7,
        images: [],
        providerId: "11111111-2222-3333-4444-555555555555" // ✅ UUID
      }
    ],
    total: 1
  });
}