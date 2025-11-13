import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}

            <Toaster />
        </div>
    );
}
