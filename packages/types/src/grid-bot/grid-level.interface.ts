import { XOrderStatus } from "../common/index.js";

export interface IGridBotLevel {
  buy: {
    price: number;
    status: XOrderStatus;
    quantity: number;
  };
  sell: {
    price: number;
    status: XOrderStatus;
    quantity: number;
  };
}
