// src/lib/store.ts
import { create } from 'zustand'

// 1. Define what the store looks like (Types)
interface AppState {
  submissionCount: number
  incrementCount: () => void
}

// 2. Create and EXPORT the store
export const useAppStore = create<AppState>((set) => ({
  submissionCount: 0,
  incrementCount: () => set((state) => ({ submissionCount: state.submissionCount + 1 })),
}))