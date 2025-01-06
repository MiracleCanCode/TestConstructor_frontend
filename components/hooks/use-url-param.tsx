export const useUrlParams = () => {
    const setUrlParam = (param: string, value: string) => {
        const currentUrl = new URL(window.location.href)
        const searchParams = currentUrl.searchParams

        searchParams.set(param, value)

        window.history.pushState({}, '', currentUrl.toString())
    }

    return { setUrlParam }
}
