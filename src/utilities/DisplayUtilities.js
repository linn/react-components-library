import React from 'react';
import Modal from '@material-ui/core/Modal';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

function LinkOrAnchor({ hasExternalLinks, text, href }) {
    if (hasExternalLinks) return <a href={href}> {text} </a>;
    return <Link to={href}> {text}</Link>;
}

export const format = (i, prefix, suffix, decimalPlaces) => {
    let decimalPlaceTemplate;

    if (!decimalPlaces || decimalPlaces === '0') {
        decimalPlaceTemplate = '';
    } else {
        decimalPlaceTemplate = `.${Array(decimalPlaces + 1).join('0')}`;
    }

    if (i || i === 0) {
        return (prefix || '') + numeral(i).format(`0,0${decimalPlaceTemplate}`) + (suffix || '');
    }

    return null;
};

export const setDrilldown = (item, hasExternalLinks) => {
    let displayItem;
    let href;
    if (item && item.hasOwnProperty('displayString')) {
        displayItem = item.displayString;
        if (item.drillDowns.length > 0) {
            href = item.drillDowns[0].href;
        }
    } else {
        displayItem = item;
    }
    let text = displayItem;
    if (href) {
        return LinkOrAnchor({ hasExternalLinks, text, href });
    }

    return displayItem;
};

export const formatTitle = (title, showTitle, loading, error, helpText) => {
    if (error) {
        return <strong>Error</strong>;
    }

    if (!showTitle) {
        return '';
    }

    let displayTitle;
    if (title && title.displayString) {
        displayTitle = title.displayString;
    } else {
        displayTitle = title;
    }

    if (loading) {
        return <h5>{`${displayTitle} (loading)`}</h5>;
    }

    return (
        <div className="row">
            <div className="col-xs-11">
                <h5>{setDrilldown(title)}</h5>
            </div>
            {helpText ? (
                <div className="col-xs-1">
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {helpText}
                    </Modal>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export const setValueDrilldown = (value, hasExternalLinks) => {
    let displayItem;
    if (value && (value.displayValue || value.displayValue === 0)) {
        if (value.drillDowns && value.drillDowns.length > 0) {
            displayItem = format(
                value.displayValue,
                value.prefix,
                value.suffix,
                value.decimalPlaces
            );
            let text = value.displayValue;
            let href = value.drillDowns[0].href;
            displayItem = LinkOrAnchor({ hasExternalLinks, href, text });
        } else {
            displayItem = format(
                value.displayValue,
                value.prefix,
                value.suffix,
                value.decimalPlaces
            );
        }
    } else {
        displayItem = null;
    }

    return displayItem;
};

export const setTextValueDrilldown = (value, hasExternalLinks) => {
    let displayItem;
    if (value && value.textDisplayValue) {
        if (value.drillDowns && value.drillDowns.length > 0) {
            let text = value.textDisplayValue;
            let href = value.drillDowns[0].href;
            displayItem = LinkOrAnchor({ hasExternalLinks, text, href });
        } else {
            displayItem = value.textDisplayValue;
        }
    } else {
        displayItem = null;
    }

    return displayItem;
};
