"use client"

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import {
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { DataTableFeatures } from "./data-table-features"

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

// TanStack Table v9
// First generic  = table features
// Second generic = row data
const columnHelper =
  createColumnHelper<DataTableFeatures, ProductType>()

export const columns: ColumnDef<
  DataTableFeatures,
  ProductType,
  any
>[] = [
  columnHelper.accessor("id", {
    header: "ID",

    cell: ({ getValue }) => {
      const id = getValue()

      return (
        <span className="font-medium">
          {id !== undefined && id !== null
            ? String(id)
            : "—"}
        </span>
      )
    },
  }),

  columnHelper.accessor("image", {
    header: "Picture",

    cell: ({ getValue }) => {
      const src = getValue()

      if (!src) {
        return (
          <span className="text-muted-foreground">
            No image
          </span>
        )
      }

      return (
        <Image
          width={50}
          height={50}
          src={src}
          alt="Product picture"
          className="rounded-md object-contain"
        />
      )
    },
  }),

  columnHelper.accessor("title", {
    header: "Title",

    cell: ({ getValue }) => {
      const title = getValue()

      return title ?? "—"
    },
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

      if (!category) {
        return (
          <span className="text-muted-foreground">
            —
          </span>
        )
      }

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

      return rate !== undefined && rate !== null
        ? `${rate} ★`
        : "N/A"
    },
  }),

  columnHelper.display({
    id: "actions",

    cell: ({ row }) => {
      const product = row.original

      const copyProductId = async () => {
        if (
          product.id === undefined ||
          product.id === null
        ) {
          return
        }

        await navigator.clipboard.writeText(
          String(product.id)
        )
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              />
            }
          >
            <span className="sr-only">
              Open menu
            </span>

            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={copyProductId}
            >
              Copy product ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              View product
            </DropdownMenuItem>

            <DropdownMenuItem>
              View product details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]