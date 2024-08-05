
export interface Transaction {
    amount: number;
    productId: number;
    customer: Customer;
    card: Card;
    date: Date;
    numberUnits: number;
}


export interface Card {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
    installments: number;
}

export interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
}