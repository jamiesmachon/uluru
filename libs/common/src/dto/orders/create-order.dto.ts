export class CreateOrderDTO {
  userId: number;
  items: { productId: number; quantity: number }[];
}
