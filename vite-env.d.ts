/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEMENT: string
  readonly REACT_APP_API: string
  readonly REACT_APP_API_IMAGES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}