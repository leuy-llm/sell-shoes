export interface Product {
    id: number,
    title: string,
    img: string,
    rating: number,
    reviews: string,
    prevPrice: number,
    newPrice: number,
    company: string,
    color: string,
    category: string,
    brand: string
}


export interface Brand {
    id: number,
    name: string
}
