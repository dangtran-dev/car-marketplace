"use client";

import { checkAuth } from "@/api/auth";
import { useTokensStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
    const accessToken = useTokensStore((state) => state.accessToken);

    const { data: user, isLoading } = useQuery({
        queryFn: () => checkAuth(),
        queryKey: ["authStatus", accessToken],
        enabled: !!accessToken,
        retry: false,
    });

    return { user, isLoading };
}
