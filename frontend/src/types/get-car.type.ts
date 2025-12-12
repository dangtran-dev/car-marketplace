import { Car } from "./car.type";

export type getCar = {
    data: Car[];
    page: number;
    limit: number;
    total: number;
};
