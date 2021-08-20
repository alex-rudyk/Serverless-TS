export enum OrderStatus {
    InProgress = 'IN_PROGRESS',
    Success = 'SUCCESS',
    Failed = 'failed'
};

export interface Order {
    uuid: string,
    name: string,
    amount: number,
    createdAt: number,
    updatedAt: number,
    status: OrderStatus
};

export type OrderCreateAttributes = Omit<Order, "createdAt" | "updatedAt" | "status">;

export type OrderUpdateAttributes = Partial<Order>;