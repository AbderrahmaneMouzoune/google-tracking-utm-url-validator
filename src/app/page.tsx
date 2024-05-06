"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import UrlManager from "@/components/url"
import UtmFileUpload from "@/components/utm-file-upload"
import processFiles from "@/lib/file-read"
import { findUrlsWithoutUTM, UrlValidator } from "@/lib/utm-checker"
import { useState } from "react"

export default function Home() {
  const [stringToCheck, setStringToCheck] = useState("")
  const [urlsWithErrors, setUrlsWIthErrors] = useState<UrlValidator[]>([])
  const [files, setFiles] = useState<File[] | null>([])

  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!files || files?.length === 0) {
      return setUrlsWIthErrors(findUrlsWithoutUTM(stringToCheck))
    }

    return processFiles(files, (content) => {
      setUrlsWIthErrors(findUrlsWithoutUTM(content))
    })
  }

  return (
    <main className="container p-5">
      <h1 className="text-xl">See if we have link without utm</h1>

      <form onSubmit={handleSubmitForm} className="mt-5">
        <section className="grid grid-cols-2 gap-5">
          <Textarea
            placeholder="Mettre le texte à vérifier ici"
            onChange={(e) => setStringToCheck(e.currentTarget.value)}
          />
          <UtmFileUpload addFiles={setFiles} />
        </section>
        <Button type="submit" className="mt-2">
          Lancer la vérification des url
        </Button>
      </form>

      {urlsWithErrors && <UrlManager urls={urlsWithErrors} />}
    </main>
  )
}
