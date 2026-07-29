"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-gray-200 dark:group-[.toaster]:bg-zinc-800 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-zinc-700",

          title: "text-sm font-semibold",

          description:
            "text-sm text-gray-500 dark:text-gray-300",

          actionButton:
            "bg-black text-white dark:bg-white dark:text-black",

          cancelButton:
            "bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }