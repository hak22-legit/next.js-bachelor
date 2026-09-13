import ProductDetailComponent from "@/components/products/ProductDetailComponent";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div>
      <ProductDetailComponent />
    </div>
  );
}
