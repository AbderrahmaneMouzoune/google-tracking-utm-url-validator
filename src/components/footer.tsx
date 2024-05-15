import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"

export default function Footer() {
  return (
    <footer className="bg-accent py-5 text-sm">
      <section className="container flex flex-col md:flex-row gap-5 justify-between items-center">
        <p>
          <span>© {new Date().getFullYear()}, Built by </span>
          <Button variant={"link"} className="px-0 pr-1" asChild>
            <Link href={"https://abderrahmanemouzoune.com"}>
              Abderrahmane Mouzoune.
            </Link>
          </Button>
          <span>and powered by </span>
          <Button variant={"link"} className="px-0" asChild>
            <Link href={"https://www.youzoune.com"}>youzoune.com</Link>
          </Button>
        </p>

        <div className="flex gap-2">
          <Link
            href={"https://github.com/AbderrahmaneMouzoune"}
            className="hover:text-primary transition-colors"
            target="_blank"
          >
            <GitHubLogoIcon className="size-6" />
          </Link>

          <hr className="size-6 w-[1px] bg-accent-foreground" />

          <Link
            href={"https://www.linkedin.com/in/abderrahmane-mouzoune/"}
            className="hover:text-primary transition-colors"
            target="_blank"
          >
            <LinkedInLogoIcon className="size-6" />
          </Link>
        </div>
      </section>
    </footer>
  )
}
