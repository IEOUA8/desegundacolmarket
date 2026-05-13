import { prisma } from "@/lib/prisma";
import type { MarketplaceProduct } from "@/lib/products";
import { AuthRequiredError, getAuthenticatedAppUser } from "@/lib/auth";

export type CartLine = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  size: string;
  condition: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
};

export type CartSummary = {
  id: string;
  items: CartLine[];
  itemCount: number;
  subtotal: number;
};

export type CartProductInput = Pick<
  MarketplaceProduct,
  "id" | "slug" | "name" | "brand" | "size" | "condition" | "price" | "image" | "stock"
>;

const cartInclude = {
  items: {
    include: {
      product: {
        include: {
          images: {
            orderBy: {
              position: "asc" as const
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "asc" as const
    }
  }
};

export function emptyCart(): CartSummary {
  return {
    id: "",
    items: [],
    itemCount: 0,
    subtotal: 0
  };
}

async function getOrCreateCart() {
  const user = await getAuthenticatedAppUser();

  if (!user) {
    throw new AuthRequiredError();
  }

  return prisma.cart.upsert({
    where: {
      userId: user.id
    },
    update: {},
    create: {
      userId: user.id
    },
    include: cartInclude
  });
}

function serializeCart(cart: Awaited<ReturnType<typeof getOrCreateCart>>): CartSummary {
  const items = cart.items.map((item) => {
    const image = item.product.images[0]?.url ?? "/window.svg";

    return {
      id: item.id,
      productId: item.productId,
      slug: item.product.slug,
      name: item.product.name,
      brand: item.product.brand,
      size: item.product.size,
      condition: item.product.condition,
      price: item.product.price,
      quantity: item.quantity,
      image,
      stock: item.product.stock
    };
  });

  return {
    id: cart.id,
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0)
  };
}

export async function getCart() {
  try {
    const cart = await getOrCreateCart();
    return serializeCart(cart);
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return null;
    }

    throw error;
  }
}

export async function addCartItem(productId: string, quantity = 1) {
  const cart = await getOrCreateCart();
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    },
    select: {
      id: true,
      stock: true
    }
  });

  if (!product || product.stock <= 0) {
    throw new Error("Product is not available.");
  }

  const current = cart.items.find((item) => item.productId === productId);
  const nextQuantity = Math.min((current?.quantity ?? 0) + quantity, product.stock);

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    },
    update: {
      quantity: nextQuantity
    },
    create: {
      cartId: cart.id,
      productId,
      quantity: Math.min(quantity, product.stock)
    }
  });

  return getCart();
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const cart = await getOrCreateCart();
  const existingItem = cart.items.find((item) => item.id === itemId);

  if (!existingItem) {
    throw new Error("Cart item was not found.");
  }

  if (quantity <= 0) {
    await prisma.cartItem.delete({
      where: {
        id: itemId
      }
    });

    return getCart();
  }

  const nextQuantity = Math.min(quantity, existingItem.product.stock);

  await prisma.cartItem.update({
    where: {
      id: itemId
    },
    data: {
      quantity: nextQuantity
    }
  });

  return getCart();
}

export async function removeCartItem(itemId: string) {
  const cart = await getOrCreateCart();
  const existingItem = cart.items.find((item) => item.id === itemId);

  if (!existingItem) {
    throw new Error("Cart item was not found.");
  }

  await prisma.cartItem.delete({
    where: {
      id: itemId
    }
  });

  return getCart();
}
