
export class ProductService{
    private urlBase: string;

    constructor(urlBase: string) {
        this.urlBase = urlBase;
    }

    async checkCategories(categories: string[]): Promise<string[]> {
        const result = await Promise.all(categories.map(async (category) => {
            const response = await fetch(`${this.urlBase}?category=${category}`);
            
            if(!response.ok)
                return null;

            const data = await response.json();
            return data.allowed ? category : null;
        }));

        return result.filter((category): category is string => category !== null);
    }
}