const useIsLoading = (bool: boolean) => {
    localStorage.setItem('isLoading', String(bool))
    window.dispatchEvent(new Event("storage"));
}

export default useIsLoading;