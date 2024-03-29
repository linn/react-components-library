import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';

export default function usePreviousNextNavigation(
    urlBuilder,
    searchResults,
    navigateFunction,
    idStyle = 'param',
    idFieldName
) {
    const { search } = useLocation();
    const parsed = queryString.parse(search);
    const { id } = useParams();

    let idField;

    if (idStyle === 'query') {
        idField = parsed?.[idFieldName];
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
