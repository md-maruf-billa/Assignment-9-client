export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId?: string;
    tags?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface ICategory {
    id:string;
    categoryImage:string;
    name: string;
}