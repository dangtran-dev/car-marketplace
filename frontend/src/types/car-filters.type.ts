import { BodyType } from "./body-type.type";
import { Brand } from "./brand.type";

export type CarFilters = {
    brands: Brand[];
    bodyTypes: BodyType[];
};
