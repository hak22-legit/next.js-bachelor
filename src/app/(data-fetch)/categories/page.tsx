import CategoryListComponent from "@/components/categories/CategoryListComponent"

async function getCategories() {
  try {
    const res = await fetch(
      "https://api.escuela.js.co/api/v1/categories",
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status}`
      )
    }

    return await res.json()
  } catch (error) {
    console.error("Category fetch error:", error)

    return []
  }
}

export default async function CategoryPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1>Categories</h1>

      {categories.length > 0 ? (
        <CategoryListComponent category={categories} />
      ) : (
        <p>Categories are currently unavailable.</p>
      )}
    </div>
  )
}