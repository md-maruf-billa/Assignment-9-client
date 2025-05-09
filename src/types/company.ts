/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Account {
    id: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    isDeleted: boolean;
    isCompleteProfile: boolean;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId:string;
    description: string;
    imageUrl: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface Company {
    id: string;
    name: string;
    accountId: string;
    website: string | null;
    companyImage: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    account: Account;
    products: Product[];
}


export interface CompaniesAPIResponse {
    success: boolean;
    message: string;
    data: Company[];
    meta: any;
}

export interface CompaniesProps {
    companiesData: CompaniesAPIResponse;
}

export interface CompanyResponse {
    success: boolean;
    message: string;
    data: Company | undefined;
    meta: any;
}

export interface CompanyDetailsProps {
    companyData: CompanyResponse;
    isLoading?: boolean;
}
