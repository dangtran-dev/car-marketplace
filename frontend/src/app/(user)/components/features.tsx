import FeatureCard from "@/components/feature-card";
import { MdOutlineShield, MdVerified } from "react-icons/md";
import { SiFastly } from "react-icons/si";

export default function FeaturesSection() {
    const features = [
        {
            icon: MdOutlineShield,
            title: "Verified Listings",
            description:
                "Every vehicle undergoes a comprehensive verification process. Buy with confidence knowing all details are accurate and transparent.",
        },
        {
            icon: MdVerified,
            title: "Trusted Sellers",
            description:
                "Connect with verified dealers and private sellers. All listings are screened for quality and authenticity.",
        },
        {
            icon: SiFastly,
            title: "Instant Matches",
            description:
                "Advanced AI-powered search finds your perfect car instantly. Filter by make, model, price, features, and more.",
        },
    ];

    return (
        <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-4">
                    Why Choose EcoDrive?
                </h2>

                <p className="max-w-2xl mx-auto text-muted-foreground text-base">
                    The most trusted automotive marketplace with verified
                    listings, transparent pricing, and exceptional customer
                    service
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                ))}
            </div>
        </section>
    );
}
