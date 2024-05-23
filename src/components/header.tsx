import React from 'react'
import { ThemeToggle } from './theme-toggle'
import LangToggle from './locale-switcher-select'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-end p-5 gap-2">
      <ThemeToggle />
      <LangToggle />
    </header>
  )
}
