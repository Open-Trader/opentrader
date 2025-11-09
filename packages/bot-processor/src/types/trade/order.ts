import { XEntityType, XOrderSide, XOrderStatus, XOrderType } from "@opentrader/types";

export type Order = {
  id: number;
  status: XOrderStatus;
  type: XOrderType;
  entityType: XEntityType;
  side: XOrderSide;
  quantity: number;
  quantityExecuted: number;
  volume: number;
  volumeExecuted: number;
  price?: number;
  stopPrice?: number;
  relativePrice?: number;
  filledPrice?: number;
  fee?: number;
  symbol: string;
  exchangeAccountId: number;
  exchangeOrderId?: string;

  createdAt: Date;
  updatedAt: Date;
  placedAt?: Date;
  syncedAt?: Date;
  filledAt?: Date;
};
