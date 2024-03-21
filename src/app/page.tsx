"use client"
import { findUrlsWithoutUTM, UrlValidator } from "@/lib/utm-checker";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [stringToCheck, setStringToCheck] = useState("")
  const [urlError, setUrlError] = useState<UrlValidator[]>([])
  
  const handleSubmitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setUrlError(findUrlsWithoutUTM(stringToCheck))
  }
  return (
    <main>
      <h1>See if we have link without utm</h1>

      <form onSubmit={handleSubmitForm}>
        <input className="border p-5" type="text" placeholder="Ici mettre le texte" onChange={(e) => setStringToCheck(e.currentTarget.value)} />
        <button type="submit">Go check !</button>
      </form>

      <section>
        {urlError.length > 0 &&
          <ul>
            {urlError.map((url, i) => <li key={`url-${url}-${i}`}>{url.url} as {url.missingParameters.length}</li>)}
          </ul>
        }
      </section>
    </main>
  );
}
