export const useUrlParams = () => {
    const setUrlParam = (param: string, value: string) => {
        const currentUrl = new URL(window.location.href)
        const searchParams = currentUrl.searchParams

        searchParams.set(param, value)

        window.history.pushState({}, '', currentUrl.toString())
    }

    const getUrlParam = (param: string): string | null => {
        const currentUrl = new URL(window.location.href)
        const searchParams = currentUrl.searchParams

        return searchParams.get(param)
    }

    return { setUrlParam, getUrlParam }
}
