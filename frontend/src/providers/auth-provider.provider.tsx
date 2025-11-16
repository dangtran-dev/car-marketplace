"use client";

import LoadingDots from "@/components/loader";
import { useAuth } from "@/hooks";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, isFetching } = useAuth();

    if (isLoading || isFetching) {
        return <LoadingDots />;
    }

    return <AuthContext value={user}>{children}</AuthContext>;
}
