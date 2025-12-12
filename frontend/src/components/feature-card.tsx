import { Card, CardContent, CardHeader } from "./ui/card";
import { IconType } from "react-icons";

export default function FeatureCard({
    feature,
}: {
    feature: {
        icon: IconType;
        title: string;
        description: string;
    };
}) {
    return (
        <Card className="flex-1 group hover:-translate-y-3 transition-transform duration-500">
            <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary">
                    <feature.icon className="text-white" size={24} />
                </div>

                <h3 className="text-xl font-semibold group-hover:text-primary duration-500">
                    {feature.title}
                </h3>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {feature.description}
                </p>
            </CardContent>
        </Card>
    );
}
