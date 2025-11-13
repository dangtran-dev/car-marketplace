import Header from "@/components/header";
import "../globals.css";

export default function UserLayout({
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
