import { useDispatch, useSelector } from "react-redux";
import articles from "../data/articles";
import { addToCart } from "../store/cartReducer";

export default function ArticleList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Articles</h2>
      <ul className="space-y-2">
        {articles.map((article) => {
          const line = cart.find((l) => l.article.id === article.id);
          const inCart = line ? line.quantity : 0;
          const soldOut = inCart >= article.stock;

          return (
            <li
              key={article.id}
              className="flex items-center justify-between border rounded p-3"
            >
              <div>
                <p className="font-medium">{article.name}</p>
                <p className="text-sm text-gray-500">
                  {article.price} DH · {article.stock - inCart} available
                </p>
              </div>
              <button
                onClick={() => dispatch(addToCart(article))}
                disabled={soldOut}
                className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {soldOut ? "No stock left" : "Add to cart"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}