import Header from "@/components/header";
import React from "react";

export default async function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />

            {children}
        </div>
    );
}
