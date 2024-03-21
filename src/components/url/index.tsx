import { DataTable } from "@/components/ui/data-table"
import { UrlWithError, columns } from "./columns"

type Props = {
    urls: UrlWithError[]
}

export default function UrlManager({ urls }: Props) {
  return (
    <section className="mx-auto my-10">
      <DataTable columns={columns} data={urls.filter(url => url.missingParameters.length > 0)} />
    </section>
  )
}
