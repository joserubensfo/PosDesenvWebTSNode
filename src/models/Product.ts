export class Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    pictureUrl: string;

    constructor(id: string, name: string, price: number, description: string, category: string, pictureUrl: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.pictureUrl = pictureUrl;
    }
}