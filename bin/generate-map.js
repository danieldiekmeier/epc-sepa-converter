// import readXlsxFile from 'read-excel-file/node'
import xlsx from "node-xlsx"
import fs from "node:fs"
import { join } from "node:path"
import * as url from "node:url"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

const filepath = join(__dirname, "./EPC217-08-SEPA-Conversion-Table.xls")
let { data } = xlsx.parse(fs.readFileSync(filepath))[0]
data = data.slice(8, -35)

const replacements = {}

data.forEach((row) => {
  let [_sign, denotation, inputCodePoint, _conversion, outputCodePoints] = row
  outputCodePoints ||= inputCodePoint

  if (!inputCodePoint) return
  if (denotation === "From U+0460 to U+20AB") return
  if (denotation === "from U+20AD to  10FFFF (Unicode 5.1)") return
  if (outputCodePoints === "N/A") {
    // The user needs to handle this
    outputCodePoints = inputCodePoint
  }

  inputCodePoint = inputCodePoint.split("U+")[1]
  const from = String.fromCharCode(parseInt(inputCodePoint, 16))
  const to = outputCodePoints
    .trim()
    .split(/,? /)
    .map((outputCodePoint) => {
      outputCodePoint = outputCodePoint.split("U+")[1]
      return String.fromCharCode(parseInt(outputCodePoint, 16))
    })
    .join("")

  const skip = to === "."
  console.log(`"${outputCodePoints}" -> "${to}" ${skip ? "(skip)" : ""}`)

  // Skip these, since we fallback to "." anyway.
  if (skip) return

  replacements[from] = to
})

const outFilePath = join(__dirname, "../src/replacements.js")
fs.writeFileSync(
  outFilePath,
  `export const replacements = ${JSON.stringify(replacements, null, 2)}`,
)
