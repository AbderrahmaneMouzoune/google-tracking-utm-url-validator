'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Locale, locales } from '@/config'
import { usePathname, useRouter } from '@/navigation'
import { FR, US } from 'country-flag-icons/react/3x2'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'

const flagByLocal: Record<Locale, JSX.Element> = {
  fr: <FR className="size-6" />,
  en: <US className="size-6" />,
}

export default function LocaleSwitcherSelect() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale() as Locale

  const changeToLocale = (locale: any) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale },
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {flagByLocal[locale] ? flagByLocal[locale] : locale}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((curr) => (
          <DropdownMenuItem onClick={() => changeToLocale(curr)}>
            {flagByLocal[curr] ? flagByLocal[curr] : curr}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
