"use client";

import { checkAuth } from "@/api/auth";
import { useTokensStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useAuth() {
    const accessToken = useTokensStore((state) => state.accessToken);

    const {
        data: user,
        isLoading,
        isFetching,
    } = useQuery({
        queryFn: () => checkAuth(),
        queryKey: ["authStatus", accessToken],
        enabled: !!accessToken,
        retry: false,
    });

    return { user, isLoading, isFetching };
}
