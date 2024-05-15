# EPC217-08 SEPA Conversion

Convert strings to the "EPC Basic Character Set" according to the EPC217-08 SEPA Conversion Table.

That means, any string will be boiled down to these characters, outlined in [EPC217-08 Draft Best Practices SEPA Requirements for Character Set v1.1.pdf](https://www.europeanpaymentscouncil.eu/sites/default/files/KB/files/EPC217-08%20Draft%20Best%20Practices%20SEPA%20Requirements%20for%20Character%20Set%20v1.1.pdf):

```
a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
0 1 2 3 4 5 6 7 8 9
/ - ? : ( ) . , ' +
(Space)
```

> [!NOTE]
> I wasn't able to completely understand what to do with `&` and `"`, so they will _also_ be preserved, even though they are not part of this set. Replace or remove them if your bank has problems with them. Or, even better, send a PR!

## Installation

```sh
npm i epc217-08-sepa-conversion
```

## Usage

```js
import * as ECP217 from 'epc217-08-sepa-conversion'

ECP217.convert("Fußgängerübergänge")
// => "Fusgangerubergange"

ECP217.convert("Bärbel Garçon")
// => "Barbel Garcon"

ECP217.convert("J’accuse") // Typographic apostrophe
// => "J.accuse"

// & and " and ' are _not_ replaced, because there are no replacements for them defined in the Excel file.
ECP217.convert('Ben & Jerry present: "Ice Cream"')
// => 'Ben & Jerry present: "Ice Cream"'
```

## Development

- Put the [EPC217-08-SEPA-Conversion-Table.xls](https://www.europeanpaymentscouncil.eu/sites/default/files/KB/files/EPC217-08-SEPA-Conversion-Table.xls) into `bin`
- Run `pnpm generate-map`
- Run the tests with `pnpm test` (or `pnpm test:watch`)
- Generate type declarations with `pnpm tsc`

---

Developed with 💙 at [Eintrittskarten.io](https://eintrittskarten.io).
