# ZevCommerce Storefront SDK

The official JavaScript/TypeScript Headless SDK for integrating [ZevCommerce Headless API](https://zevcommerce.com) into any frontend framework (Next.js, Vue, React Native, or generic Node.js). 

This zero-dependency SDK is built entirely on the native `fetch` API, providing a lightweight, perfectly typed developer experience.

## Installation

Install the package via your preferred package manager:

```bash
npm install @zevop/commerce-storefront
# or
yarn add @zevop/commerce-storefront
# or
pnpm add @zevop/commerce-storefront
```

## Initialization

Import and initialize the `ZevClient` with your store's endpoint and public key.

```typescript
import { ZevClient } from '@zevop/commerce-storefront';

const client = new ZevClient({
  endpoint: 'https://headless-api.zevcommerce.com/graphql/v1',
  publicKey: 'pk_live_...', // For browser applications
  // privateKey: 'sk_live_...', // Alternative for secure server-side apps
});
```

## Usage

The SDK is strictly typed and divided into modules corresponding to the ZevCommerce GraphQL API.

### Products & Collections
Fetch product listings, single products, and collections seamlessly.

```typescript
// Fetch paginated products
const { data: products, meta } = await client.products.list({ page: 1, limit: 12 });

// Fetch a specific product by slug
const product = await client.products.getBySlug('classic-t-shirt');

// Fetch collections
const collections = await client.collections.list();
```

### Cart & Checkout
Managing the cart requires tracking the `cartId` and `cartAccessToken` returned upon cart creation.

```typescript
// 1. Create a cart
const cart = await client.cart.create();
const { id: cartId, accessToken } = cart;

// 2. Add an item to the cart
const updatedCart = await client.cart.addLines(cartId, accessToken, [
  { variantId: 'var_123', quantity: 1 }
]);

// 3. Checkout the cart
const orderDraft = await client.checkout.cartCheckout({
  cartId,
  cartAccessToken: accessToken,
  email: 'customer@example.com',
  // shippingAddress, billingAddress, etc.
});

// The orderAccessToken is required to verify the payment or query the order later
console.log(orderDraft.orderAccessToken);
```

### Authentication & Customer Profiles
Operations under `client.customer` require an authenticated session token.

```typescript
// Login a customer
const { accessToken, customer } = await client.auth.login('email@test.com', 'password123');

// Update the client globally with the customer's token
client.updateOptions({ customerToken: accessToken });

// Fetch their secure profile data
const profile = await client.customer.getProfile();

// Fetch their order history
const orders = await client.customer.getOrders({ limit: 5 });
```

## Advanced Usage

### Error Handling
The SDK throws standard JavaScript Errors for both network failures and GraphQL-level errors. You can catch them safely:

```typescript
try {
  await client.products.getBySlug('non-existent');
} catch (error) {
  console.error(error.message); // Detailed message including GraphQL reasons
}
```

### TypeScript Usage
All interfaces used by the SDK are exported from the library roots under `@zevop/commerce-storefront/types`.

```typescript
import { Product, Cart, Order } from '@zevop/commerce-storefront';
```

---

*Open Source under the MIT License. Maintained by Zevop.*
