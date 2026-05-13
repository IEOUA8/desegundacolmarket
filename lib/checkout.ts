import { OrderStatus, ProductStatus } from "@prisma/client";
import { z } from "zod";
import { AuthRequiredError, getAuthenticatedAppUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const checkoutAddressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  line1: z.string().min(5),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(2).default("CO")
});

export type CheckoutAddressInput = z.infer<typeof checkoutAddressSchema>;

export class EmptyCartError extends Error {
  constructor() {
    super("Cart is empty.");
  }
}

export class StockError extends Error {
  constructor(productName: string) {
    super(`${productName} is no longer available in the requested quantity.`);
  }
}

async function requireUser() {
  const user = await getAuthenticatedAppUser();

  if (!user) {
    throw new AuthRequiredError();
  }

  return user;
}

export async function getCheckoutData() {
  const user = await getAuthenticatedAppUser();

  if (!user) {
    return null;
  }

  const [cart, addresses] = await Promise.all([
    prisma.cart.findUnique({
      where: {
        userId: user.id
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: {
                    position: "asc"
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    }),
    prisma.address.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  ]);

  const items =
    cart?.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      slug: item.product.slug,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0]?.url ?? "/window.svg"
    })) ?? [];

  return {
    user,
    addresses,
    cart: {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  };
}

export async function createOrderFromCart(addressInput: CheckoutAddressInput) {
  const user = await requireUser();
  const addressData = checkoutAddressSchema.parse(addressInput);

  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new EmptyCartError();
  }

  for (const item of cart.items) {
    if (
      item.product.status !== ProductStatus.ACTIVE ||
      item.product.stock < item.quantity
    ) {
      throw new StockError(item.product.name);
    }
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const order = await prisma.$transaction(async (tx) => {
    const address = await tx.address.create({
      data: {
        ...addressData,
        userId: user.id,
        label: "Checkout"
      }
    });

    const createdOrder = await tx.order.create({
      data: {
        userId: user.id,
        status: OrderStatus.PENDING,
        subtotal,
        total: subtotal,
        shippingAddressId: address.id,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            productName: item.product.name,
            productSlug: item.product.slug
          }))
        }
      },
      include: {
        items: true
      }
    });

    for (const item of cart.items) {
      await tx.product.update({
        where: {
          id: item.productId
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

    return createdOrder;
  });

  return order;
}

export async function getOrderById(orderId: string) {
  const user = await getAuthenticatedAppUser();

  if (!user) {
    return null;
  }

  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id
    },
    include: {
      shippingAddress: true,
      items: true
    }
  });
}
