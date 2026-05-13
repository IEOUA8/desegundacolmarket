import { NextResponse } from "next/server";
import { z } from "zod";
import { removeCartItem, updateCartItemQuantity } from "@/lib/cart";

export const dynamic = "force-dynamic";

type CartItemRouteProps = {
  params: Promise<unknown>;
};

const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0)
});

const paramsSchema = z.object({
  itemId: z.string().min(1)
});

export async function PATCH(request: Request, { params }: CartItemRouteProps) {
  const parsedParams = paramsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid cart item id." }, { status: 400 });
  }

  const body = await request.json();
  const parsed = updateCartItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart item payload." }, { status: 400 });
  }

  try {
    const cart = await updateCartItemQuantity(parsedParams.data.itemId, parsed.data.quantity);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update cart item." },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, { params }: CartItemRouteProps) {
  const parsedParams = paramsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json({ error: "Invalid cart item id." }, { status: 400 });
  }

  try {
    const cart = await removeCartItem(parsedParams.data.itemId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to remove cart item." },
      { status: 400 }
    );
  }
}
