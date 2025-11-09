export function useLocalStorage() {
    const isClient = typeof window !== 'undefined'

    return {
        get<T>(key: string): T | null {
            if (!isClient) return null
            const item = localStorage.getItem(key)
            try {
                return item ? JSON.parse(item) as T : null
            } catch {
                return null
            }
        },

        set<T>(key: string, value: T): void {
            if (!isClient) return
            localStorage.setItem(key, JSON.stringify(value))
        },

        remove(key: string): void {
            if (!isClient) return
            localStorage.removeItem(key)
        }
    }
}
