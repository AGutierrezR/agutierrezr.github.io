const clampGenerator = require('./clamp-generator.cjs')
const tokensToTailwind = require('./tokens-to-tailwind.cjs')

const colorTokens = require('../design-tokens/colors.json')
const fontTokens = require('../design-tokens/fonts.json')
const spacingTokens = require('../design-tokens/spacing.json')
const textSizeTokens = require('../design-tokens/text-sizes.json')

const colors = tokensToTailwind(colorTokens.items)
const fontFamily = tokensToTailwind(fontTokens.items)
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items))
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items))

module.exports = {
  colors,
  fontSize,
  fontFamily,
  spacing,
}
