function useFetch(url) {
    return fetchIt(url);
}

async function fetchIt(url){
    const response = await fetch(url);
    return await response.json()
}
export default useFetch;