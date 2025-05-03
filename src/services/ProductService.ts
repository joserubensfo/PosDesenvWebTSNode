
export class ProductService{
    private urlBase: string;

    constructor(urlBase: string) {
        this.urlBase = urlBase;
    }

    async checkCategories(categories: string[]): Promise<string[]> {
        const promises = categories.map(async (category) => {
            const response = await fetch(`${this.urlBase}?category=${category}`);
            
            if (response.ok) {
                const data = await response.json();
                return data.allowed ? category : null;
            }
            return null;
        });
    
        const results = await Promise.all(promises);
        return results.filter((category) => category !== null) as string[];
    }
}