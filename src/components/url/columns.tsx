"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"

type PossibleParameters = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"

export type UrlWithError =  {
    url: string
    missingParameters: PossibleParameters[]
}

export const columns: ColumnDef<UrlWithError>[] = [
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => {
        const url: string = row.getValue("url")
        return <div className="flex gap-1">{url}</div>
    }
  },
  {
    accessorKey: "missingParameters",
    header: "Missing Parameters",
    cell: ({ row }) => {
        const url = row.getValue("url")
        const missingParameters: PossibleParameters[] = row.getValue("missingParameters");
        return <div className="flex gap-1">{missingParameters.map(param => <Badge key={`${url}-${param}`} variant={"destructive"}>{param}</Badge>)}</div>
    }
  }
]
