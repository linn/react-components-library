import { useLocation, useParams } from 'react-router-dom';

export default function usePreviousNextNavigation(
    urlBuilder,
    searchResults,
    navigateFunction,
    idStyle = 'param',
    idFieldName
) {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const { id } = useParams();

    let idField;

    if (idStyle === 'query') {
        idField = params.get(idFieldName);
    } else {
        idField = id;
    }

    const currentIndex = searchResults?.indexOf(idField);
    const currentResult = searchResults?.[currentIndex];
    const nextResult = searchResults?.[currentIndex + 1];
    const prevResult = searchResults?.[currentIndex - 1];

    const goNext = nextResult
        ? () => {
              navigateFunction(`${urlBuilder(nextResult)}`, { searchResults });
          }
        : null;
    const goPrev = prevResult
        ? () => {
              navigateFunction(`${urlBuilder(prevResult)}`, { searchResults });
          }
        : null;

    return [goPrev, goNext, prevResult, nextResult, currentResult];
}
