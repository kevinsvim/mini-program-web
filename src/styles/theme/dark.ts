import { useDark } from '@vueuse/core'

export const isDark = useDark({
    storageKey: 'vault-theme-appearance',
    valueDark: 'dark',
    valueLight: 'light',
})
