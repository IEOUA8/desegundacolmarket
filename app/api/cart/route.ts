import { NextResponse } from "next/server";
import { emptyCart, getCart } from "@/lib/cart";

export const dynamic = "force-dynamic";

export async function GET() {
  const cart = await getCart();

  if (!cart) {
    return NextResponse.json(emptyCart(), { status: 401 });
  }

  return NextResponse.json(cart);
}
