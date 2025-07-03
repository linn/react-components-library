import useGet from './useGet';

function useSearch(
    url,
    idFieldKey = 'id',
    nameFieldKey = 'name',
    descriptionFieldKey = 'description',
    requiresAuth = false,
    itemsArray = false
) {
    const { send, isLoading, result, clearData } = useGet(url, requiresAuth);

    // some old lookups like employees have stupid items array
    const results = itemsArray
        ? (result?.items.map(s => ({
              ...s,
              id: s[idFieldKey],
              name: s[nameFieldKey],
              description: s[descriptionFieldKey]
          })) ?? [])
        : (result?.map(s => ({
              ...s,
              id: s[idFieldKey],
              name: s[nameFieldKey],
              description: s[descriptionFieldKey]
          })) ?? []);
    const search = searchTerm => send(null, `?searchTerm=${searchTerm}`);
    const loading = isLoading;
    const clear = clearData;
    return { search, results, loading, clear };
}

export default useSearch;
