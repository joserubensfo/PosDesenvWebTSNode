import data from '../base/products.json';
import { Product } from "./models/Product";
import { ProductService } from "./services/ProductService";
import fs, { writeFile } from 'fs/promises';

const listProducts = (data: any[]): Product[] => {
    return data.map((item) => {
        return new Product(
            item.id,
            item.name,
            item.price,
            item.description,
            item.category,
            item.pictureUrl
        );
    });
}

const listCategories = (data: any[]): string[] => {
    const categories = data.map((item) => item.category)
    return [...new Set(categories)];
}

const filterProductsByCategory = (products: Product[], allowedCategories: string[]): Product[] => {
    return products.filter(product => allowedCategories.includes(product.category));
}

const main = async () => {
    const service = new ProductService("https://posdesweb.igormaldonado.com.br/api/allowedCategory");

    const products = listProducts(data);
    const categories = listCategories(products);
    
    const allowedCategories = await service.checkCategories(categories)
    const filteredProducts = filterProductsByCategory(products, allowedCategories);
    
    fs.writeFile('./base/processed.json', JSON.stringify(filteredProducts.map((product) => ({ id: product.id, name: product.name}))));
}

setInterval(main, 10 * 1000);











