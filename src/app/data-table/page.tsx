"use client"

import useSWR from "swr"

import { columns, type ProductType } from "./columns"
import { DataTable } from "./data-table"

const fetcher = async (url: string): Promise<ProductType[]> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const data: ProductType[] = await response.json()

  return data
}

export default function ProductDataTable() {
  const {
    data,
    error,
    isLoading,
  } = useSWR<ProductType[]>(
    "https://fakestoreapi.com/products",
    fetcher
  )

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-red-500">
          Failed to load products.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data ?? []}
      />
    </div>
  )
}