import { NextResponse } from "next/server";
import { AuthRequiredError } from "@/lib/auth";
import {
  checkoutAddressSchema,
  createOrderFromCart,
  EmptyCartError,
  StockError
} from "@/lib/checkout";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutAddressSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout address." }, { status: 400 });
  }

  try {
    const order = await createOrderFromCart(parsed.data);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof EmptyCartError || error instanceof StockError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create order." }, { status: 500 });
  }
}
