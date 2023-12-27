import PropTypes from 'prop-types';
import React from 'react';
import IOURequestStepWaypoint from './request/step/IOURequestStepWaypoint';

const propTypes = {
    /** Route params */
    route: PropTypes.shape({
        params: PropTypes.shape({
            /** Thread reportID */
            threadReportID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

            /** ID of the transaction being edited */
            transactionID: PropTypes.string,

            /** Index of the waypoint being edited */
            waypointIndex: PropTypes.string,
        }),
    }),
};

const defaultProps = {
    route: {},
};

function MoneyRequestEditWaypointPage({route}) {
    return <IOURequestStepWaypoint route={route} />;
}

MoneyRequestEditWaypointPage.displayName = 'MoneyRequestEditWaypointPage';
MoneyRequestEditWaypointPage.propTypes = propTypes;
MoneyRequestEditWaypointPage.defaultProps = defaultProps;
export default MoneyRequestEditWaypointPage;
