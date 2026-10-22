export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (article) => ({ type: ADD_TO_CART, payload: article });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const increment = (id) => ({ type: INCREMENT, payload: id });
export const decrement = (id) => ({ type: DECREMENT, payload: id });
export const clearCart = () => ({ type: CLEAR_CART });

export const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const article = action.payload;
      if (article.stock <= 0) return state;

      const found = state.cart.filter((line) => line.article.id === article.id);

      if (found.length === 0) {
        return { ...state, cart: [...state.cart, { article, quantity: 1 }] };
      }

      return {
        ...state,
        cart: state.cart.map((line) =>
          line.article.id === article.id && line.quantity < line.article.stock
            ? { ...line, quantity: line.quantity + 1 }
            : line
        ),
      };
    }

    case INCREMENT:
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.article.id === action.payload && line.quantity < line.article.stock
            ? { ...line, quantity: line.quantity + 1 }
            : line
        ),
      };

    case DECREMENT:
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.article.id === action.payload && line.quantity > 1
            ? { ...line, quantity: line.quantity - 1 }
            : line
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((line) => line.article.id !== action.payload),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export const RED_QUANTITY = 20;
export const FREE_SHIPPING_TOTAL = 1000;

export const cartTotal = (cart) =>
  cart.reduce((sum, line) => sum + line.article.price * line.quantity, 0);