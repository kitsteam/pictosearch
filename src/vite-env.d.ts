/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEMENT: string
  readonly VITE_API: string
  readonly VITE_API_IMAGES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}