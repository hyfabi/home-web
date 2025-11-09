import type {CookieOptions} from "#app";

export function usePersistentCookie<T = string>(
    key: string,
    defaultValue: T,
    _: Partial<CookieOptions<T>> = {}
) {
    return useCookie<T>(key, {
        default: () => defaultValue,
        maxAge: 60 * 60 * 24 * 365 * 10,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
}