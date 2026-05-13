import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthRequiredError } from "@/lib/auth";
import { addCartItem } from "@/lib/cart";

export const dynamic = "force-dynamic";

const addCartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = addCartItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart item payload." }, { status: 400 });
  }

  try {
    const cart = await addCartItem(parsed.data.productId, parsed.data.quantity);
    return NextResponse.json(cart);
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update cart." },
      { status: 400 }
    );
  }
}
