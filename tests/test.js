import * as ECP217 from "../src/index.js"
import { describe, it } from "node:test"
import assert from "node:assert"

describe("convert", () => {
  it("keeps the basic charset the same", () => {
    const basicCharset =
      "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 / - ? : ( ) . , +"

    assert(ECP217.convert(basicCharset) === basicCharset)
  })

  it('also keeps & and " the same', () => {
    assert(ECP217.convert('& "') === '& "')
    assert(
      ECP217.convert('Ben & Jerry present: "Ice Cream"') ===
        'Ben & Jerry present: "Ice Cream"',
    )
  })

  it("uses the replacements", () => {
    assert(ECP217.convert("Fußgängerübergänge") === "Fusgangerubergange")

    assert(ECP217.convert("Bärbel Garçon") === "Barbel Garcon")

    assert(ECP217.convert("J’accuse") === "J.accuse")
  })

  it("uses multi char replacements", () => {
    // Separated by `, ` in the xls
    assert(ECP217.convert("Θ") === "TH")

    // Separated by ` ` in the xls
    assert(ECP217.convert("я") === "ya")
  })
})
