
import CategoryListComponent from "@/components/categories/CategoryListComponent";

export default async function CategoryPage() {
  const res = await fetch("https://api.escuela.js.co/api/v1/categories");
  const categories = await res.json();

  return (
    <div>
      <h1>Categories</h1>
      <CategoryListComponent category={categories} />
    </div>
  );
}