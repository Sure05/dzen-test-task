type Guarantee = {
    start: string,
    end: string
}

export type Price = {
    value: number,
    symbol: string,
    isDefault: boolean | number
}

export type Product = {
    id: number,
    serialNumber: string,
    isNew: boolean,
    photo: string,
    title: string,
    type: string,
    specification: string
    guarantee: Guarantee,
    price: Price[],
    order: number,
    date: string,
    exist: boolean
}

export type Products = Product[]
