export interface CheckoutData {
    id: string;
    companyData: CompanyData;
    customerData?: CustomerData;
}

export interface CompanyData {
    name: string;
    phone: number;
}

export interface CustomerData {
    firstName?: string;
    lastName?: string;
    zipCode?: number;
    mail?: string;
}