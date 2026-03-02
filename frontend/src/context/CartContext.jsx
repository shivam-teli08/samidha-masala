import { createContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const rawItems = localStorage.getItem('samidha_cart');
    return rawItems ? JSON.parse(rawItems) : [];
  });

  const persistItems = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem('samidha_cart', JSON.stringify(nextItems));
  };

  const addToCart = (product) => {
    const existing = items.find((item) => item.productId === product._id);
    if (existing) {
      const updated = items.map((item) =>
        item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      persistItems(updated);
      return;
    }
    persistItems([
      ...items,
      {
        productId: product._id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        category: product.category,
        quantity: 1,
      },
    ]);
  };

  const increment = (productId) => {
    const updated = items.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    persistItems(updated);
  };

  const decrement = (productId) => {
    const updated = items
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    persistItems(updated);
  };

  const remove = (productId) => {
    persistItems(items.filter((item) => item.productId !== productId));
  };

  const clear = () => {
    persistItems([]);
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      total,
      addToCart,
      increment,
      decrement,
      remove,
      clear,
    }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
