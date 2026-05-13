# Diseno de Base de Datos

## Nucleo MVP

- `User`: cuenta interna sincronizable con Supabase Auth.
- `SellerProfile`: datos comerciales del vendedor.
- `Category`: categorias y subcategorias por jerarquia.
- `Product`: publicacion principal de cada prenda o accesorio.
- `ProductImage`: galeria ordenada por producto.
- `Favorite`: favoritos por usuario.
- `Cart` y `CartItem`: carrito persistente.
- `Order` y `OrderItem`: compra y snapshot de precio.
- `Payment`: estado y proveedor de pago.
- `Shipment`: estado logistico.
- `Address`: direcciones del comprador.
- `Review`: valoraciones.
- `Coupon`: descuentos.

## Integracion Supabase

`User.supabaseAuthId` permite relacionar el usuario de Prisma con el `auth.users.id` de Supabase sin duplicar contrasenas.

## Decisiones

- PostgreSQL es la fuente de verdad.
- Prisma mantiene las migraciones versionadas.
- Las imagenes se guardan como registros en `ProductImage`; el archivo real vive en Supabase Storage o Cloudinary.
- El inventario parte de stock simple, suficiente para moda second hand donde muchas piezas son unicas.
