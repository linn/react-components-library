export default state => {
    const { fetchError } = state;
    if (!fetchError) {
        return null;
    }

    const hasErrorsProperty =
        Object.prototype.hasOwnProperty.call(fetchError, 'errors') && fetchError.errors;

    let hasErrorMessageProperty = false;

    if (hasErrorsProperty) {
        hasErrorMessageProperty = Object.prototype.hasOwnProperty.call(
            fetchError.errors[0],
            'errorMessage'
        );
    }

    if (hasErrorMessageProperty && fetchError.errors.length > 1) {
        return fetchError.errors.map(error => error.errorMessage).join(', ');
    }

    if (hasErrorMessageProperty && fetchError.errors[0].errorMessage) {
        return fetchError.errors[0].errorMessage;
    }

    if (hasErrorsProperty) {
        return fetchError.errors[0];
    }

    if (fetchError.statusText) {
        return fetchError.statusText.message || fetchError.statusText;
    }

    return null;
};
