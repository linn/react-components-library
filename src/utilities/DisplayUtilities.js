import React from 'react';
import Modal from '@material-ui/core/Modal';
import numeral from 'numeral'
import { Link } from "react-router-dom";

export const format = (i, prefix, suffix, decimalPlaces) => {
    let decimalPlaceTemplate;

    if (!decimalPlaces || decimalPlaces === '0') {
        decimalPlaceTemplate = '';
    } else {
        decimalPlaceTemplate = '.' + Array(decimalPlaces + 1).join("0");
    }

    if (i || i === 0) {
        return (prefix ? prefix : '') + numeral(i).format(`0,0${decimalPlaceTemplate}`) + (suffix ? suffix : '');
    }

    return null;
}

export const formatTitle = (title, showTitle, loading, error, helpText) => {
    if (error) {
        return <strong>Error</strong>;
    }

    if (!showTitle) {
        return false;
    }

    let displayTitle;
    if (title && title.displayString) {
        displayTitle = title.displayString;
    }
    else {
        displayTitle = title;
    }

    if (loading) {
        return <h5>{`${displayTitle} (loading)`}</h5>;
    }
    return (
        <div className="row">
            <div className="col-xs-11">
            { setDrilldown(title) ?
                <h5 className="main-title">{setDrilldown(title)}</h5> : null
            }    
            </div>
            {helpText ? (
                <div className="col-xs-1">
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        {helpText}
                    </Modal>
                </div>) : ''}
        </div>);
}

export const setDrilldown = (item) => {
    let displayItem, href;
    if (item && item.hasOwnProperty('displayString')) {
        displayItem = item.displayString;
        if (item.drillDowns.length > 0) {
            href = item.drillDowns[0].href;
        }
    } else {
        displayItem = item;
    }

    if (href) {
        return <Link to={href}>{displayItem}</Link>;
    }

    return displayItem;
}

export const setValueDrilldown = (value) => {
    let displayItem;
    if (value && (value.displayValue || value.displayValue === 0)) {
        if (value.drillDowns && value.drillDowns.length > 0) {
            displayItem = <Link className="link-value" tof={value.drillDowns[0].href}>{format(value.displayValue, value.prefix, value.suffix, value.decimalPlaces)}</Link>;
        } else {
            displayItem = format(value.displayValue, value.prefix, value.suffix, value.decimalPlaces);
        }
    } else {
        displayItem = null;
    }

    return displayItem;
}

export const setTextValueDrilldown = (value) => {
    let displayItem;
    if (value && value.textDisplayValue) {
        if (value.drillDowns && value.drillDowns.length > 0) {
            displayItem = <Link className="link-value" to={value.drillDowns[0].href}>{value.textDisplayValue}</Link>;
        } else {
            displayItem = value.textDisplayValue;
        }
    } else {
        displayItem = null;
    }

    return displayItem;
}

export const formatHeading = (title, showTitle, loading, error) => {
    if (!showTitle) {
        return false;
    }

    if (error) {
        return <strong>Error</strong>;
    }

    let displayTitle;
    if (title && title.displayString) {
        displayTitle = title.displayString;
    }
    else {
        displayTitle = title;
    }

    if (loading) {
        return <h5 className="loading-title">{`${displayTitle} (loading)`}</h5>;
    }

    return <strong>{displayTitle}</strong>;
}

export const displayError = (message) => {
    return <h5 className="error-message">{message}</h5>;
}
