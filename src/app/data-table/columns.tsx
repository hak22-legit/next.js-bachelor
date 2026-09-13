"use client"

import Image from "next/image"
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type RatingType = {
  rate: number
}

export type ProductType = {
  id?: number | string
  image?: string
  title?: string
  price?: number
  category?: string
  rating?: RatingType
}

// 1. Pass only the data type to createColumnHelper
const columnHelper = createColumnHelper<ProductType>()

// 2. Export columns as a standard array without .columns()
export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("image", {
    header: "Picture",
    cell: ({ row }) => {
      const src = row.getValue("image") as string
      if (!src) return null

      return (
        <Image
          width={50}
          height={50}
          src={src}
          alt="picture"
        />
      )
    },
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("price", {
  header: "Price",
  cell: ({ getValue }) => {
    const price = getValue()
    return (
      <span className="font-medium">
        {price !== undefined && price !== null
          ? `$${Number(price).toFixed(2)}`
          : "$0.00"}
      </span>
    )
  },
}),
  columnHelper.accessor("category", {
  header: "Category",
  cell: ({ getValue }) => {
    const category = getValue()
    if (!category) return <span className="text-muted-foreground">—</span>

    return (
      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary-foreground">
        {category}
      </span>
    )
  },
}),
  columnHelper.accessor("rating.rate", {
    header: "Rating",
    cell: ({ getValue }) => {
      const rate = getValue()
      return rate ? `${rate} ★` : "N/A"
    },
  }),
   columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id as string)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]