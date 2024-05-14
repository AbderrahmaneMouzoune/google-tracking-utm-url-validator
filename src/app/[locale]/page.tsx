"use client"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import UrlManager from "@/components/url"
import UtmFileUpload from "@/components/utm-file-upload"
import processFiles from "@/lib/file-read"
import { findUrlsWithoutUTM, UrlValidator } from "@/lib/utm-checker"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function Home() {
  const t = useTranslations("Index")

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
    <main className="container p-5 relative">
      <ThemeToggle />
      <h1 className="text-4xl text-center font-semibold my-5 text-primary">
        {t("title")}
      </h1>
      <section>
        <p>{t("description")}</p>

        <ol className="list-decimal pl-8">
          <li>
            <strong>{t("fileInput.label")}</strong> {t("fileInput.description")}
          </li>
          <li>
            <strong>{t("textInput.label")}</strong> {t("textInput.description")}
          </li>
        </ol>
      </section>
      <form onSubmit={handleSubmitForm} className="mt-5">
        <section className="grid md:grid-cols-2 gap-5">
          <Textarea
            placeholder={t("placeholder")}
            onChange={(e) => setStringToCheck(e.currentTarget.value)}
          />
          <UtmFileUpload addFiles={setFiles} />
        </section>
        <Button type="submit" className="mt-2">
          {t("checkButton")}
        </Button>
      </form>
      {urlsWithErrors && <UrlManager urls={urlsWithErrors} />}
      <section>
        <h2>{t("functionality")}</h2>

        <ul className="list-disc pl-8">
          <li>{t("functionalityPoints.first")}</li>
          <li>{t("functionalityPoints.second")}</li>
          <li>{t("functionalityPoints.third")}</li>
          <li>{t("functionalityPoints.forth")}</li>
        </ul>

        <br />

        <h2>{t("benefits")}</h2>

        <ul className="list-decimal pl-8">
          <li>{t("benefitsPoints.first")}</li>
          <li>{t("benefitsPoints.second")}</li>
          <li>{t("benefitsPoints.third")}</li>
        </ul>

        <br />

        <p>{t("overallDescription")}</p>
      </section>
    </main>
  )
}
