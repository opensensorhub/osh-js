/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */
export const Status = {
    CONNECTING: "connecting",
    CONNECTED:  "connected",
    DISCONNECTED: "disconnected",
    FETCH_STARTED: 'fetch-start',
    FETCH_ENDED: 'fetch-end',
    CLOSED: "closed",
    CLOSED_ERROR: "closed-error"
};
