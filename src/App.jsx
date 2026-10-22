import ArticleList from "./components/ArticleList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <ArticleList />
        <Cart />
      </div>
    </div>
  );
}