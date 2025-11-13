"use client";

import { useTokensStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./use-auth.hook";

export function useCheckAuthRedirect(isProtected: boolean) {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const accessToken = useTokensStore((state) => state.accessToken);
    const clearTokens = useTokensStore((state) => state.clearTokens);
    const [checkedAuth, setCheckedAuth] = useState(false);
    const redirectedRef = useRef(false);

    useEffect(() => {
        if (isLoading || redirectedRef.current) return;

        if (isProtected && (!accessToken || !user)) {
            redirectedRef.current = true;
            clearTokens();
            router.replace("/signin");
            return;
        }

        if (!isProtected && user) {
            redirectedRef.current = true;
            router.replace("/");
            return;
        }

        setCheckedAuth(true);
    }, [router, user, accessToken, isLoading, isProtected]);

    return checkedAuth;
}
