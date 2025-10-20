import { create } from "zustand";


type SearchState = {
q: string;
city?: string;
category?: string;
dateFrom?: string;
dateTo?: string;
set: (p: Partial<SearchState>) => void;
reset: () => void;
};


export const useSearchStore = create<SearchState>((set) => ({
q: "",
set: (p) => set((s) => ({ ...s, ...p })),
reset: () => set({ q: "", city: undefined, category: undefined, dateFrom: undefined, dateTo: undefined }),
}));