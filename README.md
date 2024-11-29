This project using stack: Next.js with Typescript, Headless UI, Hero icons, and context for temporary state management.

## Getting Started

First, install project with :

```bash
npm install
```

Secondly, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Explanation

This project using combine context as state management & using API on [fakestoreapi.com]

There's some features:

1. Login, it will post to /login [fakestoreapi.com], you should insert username and password based on [https://fakestoreapi.com/users]. Login will save your token and your user info inside local storage. If you're not login yet, it will redirect to /login.

2. After login, you will go to home of list products, you can search / filter, also like product.

3. If you like product, you can see list of your like products inside menu /product.

4. You can try to buy a product with go to /detail and choose how many products will you buy.

5. Go to /cart to see what's inside cart.
