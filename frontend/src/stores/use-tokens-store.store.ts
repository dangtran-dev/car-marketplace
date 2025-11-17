import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TokensStore = {
    accessToken: string | null;
    refreshToken: string | null;
    isHydrated: boolean;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    setIsHydrated: () => void;
};

export const useTokensStore = create<TokensStore>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isHydrated: false,
            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),
            clearTokens: () => {
                set({ accessToken: null, refreshToken: null });
            },
            setIsHydrated: () => set({ isHydrated: true }),
        }),
        {
            name: "tokens",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => {
                return {
                    accessToken: state.accessToken,
                    refreshToken: state.refreshToken,
                };
            },
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setIsHydrated();
                }
            },
        }
    )
);
