"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { findUrlsWithoutUTM, UrlValidator } from "@/lib/utm-checker";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";


function UrlItem({ url, missingParameters }: UrlValidator) {
  return (
    <li className="p-5 border rounded-2xl">
      <p>[{missingParameters.length} utm missing] {url}</p>
      <span className="flex gap-2">{missingParameters.map(p => <Badge key={`${url}-${p}`} variant={"destructive"}>{p}</Badge>)}</span>
    </li>
  )
}

export default function Home() {
  const [stringToCheck, setStringToCheck] = useState("")
  const [urlError, setUrlError] = useState<UrlValidator[]>([])
  
  const handleSubmitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setUrlError(findUrlsWithoutUTM(stringToCheck))
  }
  return (
    <main className="container p-5">
      <h1 className="text-xl">See if we have link without utm</h1>

      <form onSubmit={handleSubmitForm} className="mt-5">
        <Textarea placeholder="Mettre le texte à vérifier ici" onChange={(e) => setStringToCheck(e.currentTarget.value)} />
        <Button type="submit" className="mt-2">Lancer la vérification des url</Button>
      </form>

      <section className="mt-5">
        {urlError.length > 0 &&
          <ul className="flex flex-wrap gap-5">
            {urlError.filter(url => url.missingParameters.length > 0).map((url, i) => <UrlItem key={`${url}-${i}`} {...url} />)}
          </ul>
        }
      </section>
    </main>
  );
}
