import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
  cartTotal,
  RED_QUANTITY,
  FREE_SHIPPING_TOTAL,
} from "../store/cartReducer";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const total = cartTotal(cart);
  const freeShipping = total >= FREE_SHIPPING_TOTAL;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Cart</h2>
        <button
          onClick={() => dispatch(clearCart())}
          disabled={cart.length === 0}
          className="text-sm text-red-600 disabled:text-gray-300"
        >
          Clear cart
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Add an article from the list.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map(({ article, quantity }) => (
            <li
              key={article.id}
              className="flex items-center justify-between border rounded p-3"
            >
              <div>
                <p className="font-medium">{article.name}</p>
                <p className="text-sm text-gray-500">
                  {article.price} DH each · {article.price * quantity} DH
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrement(article.id))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded border disabled:text-gray-300"
                >
                  −
                </button>

                <span
                  className={`w-8 text-center font-semibold ${
                    quantity >= RED_QUANTITY ? "text-red-600" : ""
                  }`}
                >
                  {quantity}
                </span>

                <button
                  onClick={() => dispatch(increment(article.id))}
                  disabled={quantity >= article.stock}
                  className="w-8 h-8 rounded border disabled:text-gray-300"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(article.id))}
                  className="ml-2 text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        className={`mt-4 p-3 rounded flex items-center justify-between ${
          freeShipping ? "bg-green-100 text-green-800" : "bg-gray-100"
        }`}
      >
        <span className="font-semibold">Total: {total} DH</span>
        {freeShipping && <span className="font-medium">Free shipping</span>}
      </div>
    </section>
  );
}