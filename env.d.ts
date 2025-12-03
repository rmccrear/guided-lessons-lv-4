/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_USE_MARKDOWN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}