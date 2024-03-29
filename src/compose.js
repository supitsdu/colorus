import colorObject from './colorObject'
import { precision } from './helpers'
import { Clamp } from './colorNormalizer'

/**
 * **(Helper Functions)** Modifies the given `value` by a certain `amount`.
 *
 * @param {number} value - The value to modify.
 * @param {number} amount - The amount to modify the `value` by, a value between 0 and 1.
 * @return {number} The modified `value`.
 */
const modBy = (value, amount) => {
  amount = Number(amount)

  if (colorObject.nan(amount)) return value

  return precision((1 + amount) * value)
}

/**
 * Interpolates between two RGB colors based on a given amount.
 * @param {Object} primary - The primary color in RGB format.
 * @param {Object} secondary - The secondary color in RGB format.
 * @param {number} amount - A value between 0 and 1, indicating the strength of interpolation.
 * @return {Object} An object containing interpolated RGB and optional alpha values.
 */
const mix = ({ r, g, b, a = 1 }, { r: R, g: G, b: B, a: A = 1 }, amount = 0.1) => {
  const mixBy = (p, s) => p * (1 - amount) + s * amount

  return Clamp.rgb({ r: mixBy(r, R), g: mixBy(g, G), b: mixBy(b, B), a: mixBy(a * 100, A * 100) })
}

/**
 * Lightens an HSL color by the specified amount.
 * @param {Object} color - HSL color object to lighten.
 * @param {number} amount - A value between 0 and 1.
 * @return {Object} New HSL color object.
 */
const lighten = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h, s, l: modBy(l, amount), a })
}

/**
 * Saturate an HSL color by the specified amount.
 * @param {Object} color - HSL color object to lighten.
 * @param {number} amount - A value between 0 and 1.
 * @return {Object} New HSL color object.
 */
const saturate = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h, s: modBy(s, amount), l: l, a })
}

/**
 * Adjust the hue of a HSL color.
 * @param {Object} color - HSL color object..
 * @param {number} amount - A value between 0 and 1.
 * @return {Object} New HSL color object.
 */
const hue = ({ h, s, l, a = 1 }, amount) => {
  return Clamp.hsl({ h: modBy(h, amount), s, l, a })
}

/**
 * Adjust the alpha channel of a RGB color.
 * @param {Object} color - RGB color object..
 * @param {number} amount - A value between 0 and 1.
 * @return {Object} New RGB color object.
 */
const alpha = ({ r, g, b, a = 1 }, amount) => {
  return Clamp.rgb({ r, g, b, a: modBy(a, amount) })
}

export default { mix, lighten, saturate, hue, alpha, modBy }
