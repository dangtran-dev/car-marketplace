export type Car = {
    id: string;
    Brand: {
        name: string;
    };
    BodyType: {
        name: string;
    };
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    condition: string;
    transmission: string;
    images: string[];
    User: {
        name: string;
    };
};
