export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProductVariant {
    id: string;
    title: string;
    price: number;
    compareAtPrice: number | null;
    sku: string | null;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    mediaJson: any;
    variants: ProductVariant[];
}

export interface CartItemInput {
    variantId: string;
    quantity: number;
}

export interface CartLine {
    variantId: string;
    productTitle: string;
    variantTitle: string | null;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    availableQuantity: number;
}

export interface Cart {
    id: string;
    accessToken: string;
    currency: string;
    status: string;
    totalItems: number;
    subtotal: number;
    lines: CartLine[];
}

export interface HeadlessCheckoutInput {
    cartId: string;
    cartAccessToken: string;
    email: string;
    shippingAddress?: any;
    billingAddress?: any;
    paymentMethodId?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    totalAmount: number;
    currency: string;
    status: string;
    paymentStatus: string;
    paymentProvider?: string;
    paymentPublicKey?: string;
    orderAccessToken?: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string | null;
}

export interface RelayConnection<T> {
    edges: {
        cursor: string;
        node: T;
    }[];
    pageInfo: PageInfo;
}

export interface SessionInfo {
    active: boolean;
    customerId: string | null;
    scopes: string[];
}
