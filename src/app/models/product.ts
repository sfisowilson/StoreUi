import { Category } from "./Category";
import { Discount } from "./Discount";
import { Inventory } from "./Inventory";
import { ProductImage } from "./ProductImage";

export interface Product {
    id: number,
    name: string,
    longDescription: string,
    shortDescription: string,
    price: string,
    sku: string,
    productImages : ProductImage[],
    inventory: Inventory,
    category?: Category,
    discount?: Discount,
    imageData : string,
    imageMimeType: string
}
