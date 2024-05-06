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
      <h1 className="text-4xl text-center font-semibold my-5">
        Google Tracking UTM URL Validator
      </h1>

      <div>
        <p>
          The Google Tracking URL Validator is a handy tool designed for
          validating URLs within files or text strings to ensure they are
          properly tracked with Google Analytics.
        </p>

        <ol className="list-decimal pl-8">
          <li>
            <strong>File Input:</strong> Users can input files with extensions
            such as .HTML, .HTM, .MD, .MARKDOWN, or .TXT. The tool scans these
            files to extract URLs and verifies whether they are tagged correctly
            with Google Analytics parameters.
          </li>
          <li>
            <strong>Text Input:</strong> Alternatively, users can input a text
            string containing URLs. The tool parses the text to identify URLs
            and checks their tracking parameters against Google Analytics
            standards.
          </li>
        </ol>

        <br />

        <h2>Functionality</h2>

        <ul className="list-disc pl-8">
          <li>
            <strong>URL Parsing:</strong> The tool extracts URLs from the
            provided files or text input, disregarding any other content.
          </li>
          <li>
            <strong>Validation:</strong> It then examines each URL to ensure it
            contains the necessary tracking parameters prescribed by Google
            Analytics, such as UTM tags for campaign, source, medium, etc.
          </li>
          <li>
            <strong>Error Reporting:</strong> If any URLs are found to be
            missing required tracking parameters, the tool generates a report
            highlighting these discrepancies for the user's attention.
          </li>
          <li>
            <strong>Output:</strong> Users receive a comprehensive report
            detailing the status of each URL, indicating whether it is properly
            tracked or requires adjustment.
          </li>
        </ul>

        <br />

        <h2>Benefits :</h2>

        <ul className="list-decimal pl-8">
          <li>
            <strong>Content Managers:</strong> Ensuring all outbound links
            within web content are properly tracked for campaign analysis.
          </li>
          <li>
            <strong>Digital Marketers:</strong> Validating tracking parameters
            for links included in email campaigns or social media posts.
          </li>
          <li>
            <strong>Website Administrators:</strong> Verifying tracking tags on
            various pages of a website to optimize data collection and analysis.
          </li>
        </ul>

        <br />

        <p>
          Overall, the Google Tracking URL UTM Validator streamlines the process
          of confirming proper URL tracking, enhancing the reliability and
          effectiveness of data-driven marketing efforts utilizing Google
          Analytics.
        </p>
      </div>

      <form onSubmit={handleSubmitForm} className="mt-5">
        <section className="grid grid-cols-2 gap-5">
          <Textarea
            placeholder="Mettre le texte à vérifier ici"
            onChange={(e) => setStringToCheck(e.currentTarget.value)}
          />
          <UtmFileUpload addFiles={setFiles} />
        </section>
        <Button type="submit" className="mt-2">
          Check all the url
        </Button>
      </form>

      {urlsWithErrors && <UrlManager urls={urlsWithErrors} />}
    </main>
  )
}
