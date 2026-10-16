const earthRadiusKMs = 6371;

/**
 * Calculates the bearing between two geographic points.
 * @param point1 form { x: latitude in radians, y: longitude in radians }
 * @param point2 form { x: latitude in radians, y: longitude in radians }
 * @returns {number}
 */
function bearingTo(point1, point2) {
	const y = Math.sin(point2.y - point1.y) * Math.cos(point2.x);
	const x =
		Math.cos(point1.x) * Math.sin(point2.x) -
		Math.sin(point1.x) * Math.cos(point2.x) * Math.cos(point2.y - point1.y);
	let bearing = Math.atan2(y, x);
	bearing = radiansToDegrees(bearing);
	return (bearing + 360) % 360;
}

/**
 * Converts degrees to radians.
 * @param degrees
 * @returns {number}
 */
function degreesToRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 * @param radians
 * @returns {number}
 */
export function radiansToDegrees(radians) {
	return (radians * 180) / Math.PI;
}

/**
 * Converts LLA coordinates from degrees to radians.
 * @param lla
 * @returns {{lat: number, lon: number, alt: *}}
 */
export function llaRadiansToDegrees(lla) {
	return {
		lat: radiansToDegrees(lla.lat),
		lon: radiansToDegrees(lla.lon),
		alt: lla.alt,
	};
}

/**
 * Calculates the end point given a start point, bearing, and distance. Units are radians and meters.
 * @param startPoint
 * @param bearing
 * @param distance
 * @returns {{x: number, y: *}}
 */
export function endLLAFromPointBearing(startPoint, bearing, distance) {
	const angularDistance = (distance/1000) / earthRadiusKMs;
	const bearingRad = degreesToRadians(bearing);

	const lat1rad = degreesToRadians(startPoint.y);
	const lon1rad = degreesToRadians(startPoint.x);

	const lat2rad = Math.asin(
		Math.sin(lat1rad) * Math.cos(angularDistance) +
			Math.cos(lat1rad) * Math.sin(angularDistance) * Math.cos(bearingRad)
	);
	const lon2rad =
		lon1rad +
		Math.atan2(
			Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(lat1rad),
			Math.cos(angularDistance) - Math.sin(lat1rad) * Math.sin(lat2rad)
		);

	return { x: radiansToDegrees(lon2rad), y: radiansToDegrees(lat2rad) };
}
