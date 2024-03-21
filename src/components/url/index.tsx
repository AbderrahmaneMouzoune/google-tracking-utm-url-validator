import { DataTable } from "@/components/ui/data-table"
import { UrlWithError, columns } from "./columns"
import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

type Props = {
  urls: UrlWithError[]
}

export default function UrlManager({ urls }: Props) {
  const [onlyError, setOnlyError] = useState(true)

  const urlsToShow = onlyError
    ? urls.filter((url) => url.missingParameters.length > 0)
    : urls

  return (
    <section className="mx-auto my-10">
      <div className="flex gap-2 mb-2">
        <Checkbox
          id="onlyError"
          checked={onlyError}
          onCheckedChange={() => setOnlyError((prev) => !prev)}
        />
        <Label htmlFor="onlyError" className="cursor-pointer">
          Only url with error
        </Label>
      </div>

      <DataTable columns={columns} data={urlsToShow} />
    </section>
  )
}
