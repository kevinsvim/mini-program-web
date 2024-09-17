interface ImportMetaEnv {
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_ENV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
