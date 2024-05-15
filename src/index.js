import { replacements } from "./replacements.js"

/**
 * @param {string} input
 * @returns {string}
 */
export function convert(input) {
  return input
    .split("")
    .flatMap((char) => replacements[char] || ".")
    .join("")
}
