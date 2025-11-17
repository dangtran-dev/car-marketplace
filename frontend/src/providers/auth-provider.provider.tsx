"use client";

import LoadingDots from "@/components/loader";
import { useAuth } from "@/hooks";
import { useTokensStore } from "@/stores";
import { AuthSignUp } from "@/types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthSignUp | undefined>(undefined);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, isFetching } = useAuth();
    const [isHydrated, setIsHydrated] = useState(false);
    const storeIsHydrated = useTokensStore((state) => state.isHydrated);

    useEffect(() => {
        if (storeIsHydrated) {
            setIsHydrated(true);
        }
    }, [storeIsHydrated]);

    if (isLoading || isFetching || !isHydrated) {
        return <LoadingDots />;
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
