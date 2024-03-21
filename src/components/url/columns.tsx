"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

type PossibleParameters = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"

export type UrlWithError =  {
    url: string
    missingParameters: PossibleParameters[]
}

export const columns: ColumnDef<UrlWithError>[] = [
    {
        accessorKey: "isValid",
        header: "Valid",
        cell: ({ row }) => {
            const missingParameters: PossibleParameters[] = row.getValue("missingParameters");
            return <div className={cn("size-4 rounded-full mx-auto", {
                "bg-green-400": missingParameters.length === 0,
                "bg-destructive": missingParameters.length > 0 
            })} />
        }
    },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => {
        const url: string = row.getValue("url")
        return <div className="break-all"><Link href={url} target="_blank">{url}</Link></div>
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
