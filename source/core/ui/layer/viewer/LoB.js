import { assertArray, isDefined } from 'osh-js/source/core/utils/Utils';
import { endLLAFromPointBearing } from 'osh-js/source/core/utils/GeoUtils';
import { assertObject, hasValue } from 'osh-js/source/core/utils/Utils';
import Layer from '../Layer.js';

class LoBLayer extends Layer {
	/**
	 * Creates the LoB Layer
	 * @param {Object} properties
	 * @param {Object[]} [properties.locations] - defines the default location of the LoB [lat, lon]
	 * @param {Number} [properties.bearing=0] - defines the bearing of the LoB in degrees
	 * @param {Number} [properties.length=1000] - defines the length of the LoB in meters
	 * @param {Number[]} [properties.labelOffset=[0,0]] - defines the label offset of the point marker
	 * @param {String} [properties.color='red'] - defines the color of the LoB
	 * @param {Number} [properties.weight=1] - defines the weight of the LoB
	 * @param {Number} [properties.opacity=1] - defines the opacity of the LoB
	 * @param {Function} [properties.getLocation] - defines a function to return the location
	 * @param {Function} [properties.getBearing] - defines a function to return the bearing
	 * @param {Function} [properties.getLength] - defines a function to return the length
	 * @param {Function} [properties.getOrigin] - defines a function to return the origin point {x:lat, y:lon}
	 * @param {Function} [properties.getOriginAndBearing] - defines a function to return both origin and bearing {origin: {x:lat, y:lon}, bearing: number}
	 * @param {Function} [properties.getColor] - defines a function to return the color
	 */
	constructor(properties) {
		super(properties);
		this.type = 'lob';
	}

	// call by super class
	init(properties = this.properties) {
		super.init(properties);
		const props = {
			lobId: () => this.getLobId(),
			locations: [],
			bearing: 0,
			length: 1000,
			color: 'red',
			weight: 1,
			opacity: 1,
			maxPoints: 2,
			location: null,
			orientation: {heading: 0},
			label: null,
			labelColor: undefined,
			labelOutlineColor: undefined,
			labelBackgroundColor: undefined,
			labelSize: 16,
			labelScale: 1.0,
			labelOffset: [0, 0],
			zoomLevel: 15,
			defaultToTerrainElevation: false,
			zIndex: 0,
			allowBillboardRotation: true,
			options: {},
			getLabel: null,
			clampToGround: true,
		};

		if (hasValue(properties.location)) {
			assertObject(properties.location, 'location');
			props.location = properties.location;
		}

		if (hasValue(properties.locations)) {
			assertArray(properties.locations, 'locations');
			props.locations = properties.locations;
		}

		if (isDefined(properties.bearing)) {
			props.bearing = properties.bearing;
		}

		if (isDefined(properties.length)) {
			props.length = properties.length;
		}

		if (isDefined(properties.label)) {
			props.label = properties.label;
		}

		if (hasValue(properties.color)) {
			props.color = properties.color;
		}

		if (hasValue(properties.weight)) {
			props.weight = properties.weight;
		}

		if (hasValue(properties.opacity)) {
			props.opacity = properties.opacity;
		}

		if (hasValue(properties.labelOffset)) {
			props.labelOffset = properties.labelOffset;
		}

		if (isDefined(properties.polylineId)) {
			props.polylineId = properties.polylineId;
		} else if (isDefined(properties.lobId)) {
			props.polylineId = properties.lobId;
		}
		if (isDefined(properties.clampToGround)) {
			props.clampToGround = properties.clampToGround;
		}

		this.definedId('lobId', props);

		if (this.checkFn("getLobId")) {
			const syncIds = async (rec, timestamp, options) => {
				this.updateProperty('polylineId', this.getId());
			};
			this.addFn(this.getDataSourcesIdsByProperty('getLobId'), syncIds);
		}

		if (this.checkFn("getOrigin")) {
			const fn = async (rec, timestamp, options) => {
				const origin = await this.getFunc('getOrigin')(rec, timestamp, options);
				if (!origin || typeof origin.x === 'undefined' || typeof origin.y === 'undefined') {
					console.warn('[LOB] getOrigin returned invalid origin:', origin);
					return;
				}
				const currentProps = this.getCurrentProps();
				const endPoint = endLLAFromPointBearing(
					origin,
					currentProps.bearing,
					currentProps.length
				);
				this.updateProperty('location', origin);
				this.updateProperty('locations', [origin, endPoint]);
			};
			this.addFn(this.getDataSourcesIdsByProperty('getOrigin'), fn);
		}

		if (this.checkFn("getBearing")) {
			const fn = async(rec, timestamp, options) => {
				const bearing = await this.getFunc('getBearing')(rec, timestamp, options);
				if (!isDefined(bearing) || isNaN(bearing)) {
					console.warn('[LOB] getBearing returned invalid bearing:', bearing);
					return;
				}
				// persist the bearing so getOrigin updates keep the latest direction
				this.updateProperty('bearing', bearing);
				const currentProps = this.getCurrentProps();
				if (!currentProps.locations || !currentProps.locations[0]) {
					console.warn('[LOB] getBearing called but origin not set');
					return;
				}
				const endPoint = endLLAFromPointBearing(
					currentProps.locations[0],
					bearing,
					currentProps.length
				);
				this.updateProperty('locations', [currentProps.locations[0], endPoint]);
			}
			this.addFn(this.getDataSourcesIdsByProperty('getBearing'), fn);
		}

		if (this.checkFn("getOriginAndBearing")) {
			const fn = async(rec, timestamp, options) => {
				const { origin, bearing } = await this.getFunc('getOriginAndBearing')(rec, timestamp, options);
				const currentProps = this.getCurrentProps();
				let effectiveBearing = bearing;
				if (!isDefined(bearing) || isNaN(bearing)) {
					console.warn('[LoB] getOriginAndBearing returned invalid bearing, using last known:', bearing);
					effectiveBearing = currentProps.bearing;
				} else {
					// persist the bearing so getOrigin updates keep the latest direction
					this.updateProperty('bearing', bearing);
				}
				if (!origin || typeof origin.x === 'undefined' || typeof origin.y === 'undefined') {
					console.warn('[LoB] getOriginAndBearing returned invalid origin:', origin);
					return;
				}
				const endPoint = endLLAFromPointBearing(
					origin,
					effectiveBearing,
					currentProps.length
				);
				this.updateProperty('location', origin);
				this.updateProperty('locations', [origin, endPoint]);
			}
			this.addFn(this.getDataSourcesIdsByProperty('getOriginAndBearing'), fn);
		}

		if (this.checkFn("getLabel")) {
			this.updateProperty('label', this.getFunc('getLabel'));
		}

		if (isDefined(properties.getColor)) {
			let fn = async (rec, timestamp, options) => {
				this.updateProperty(
					'color',
					await this.getFunc('getColor')(rec, timestamp, options)
				);
			};
			this.addFn(this.getDataSourcesIdsByProperty('getColor'), fn);
		}
	}
}

export default LoBLayer;