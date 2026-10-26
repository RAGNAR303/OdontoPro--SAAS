// - Valor em centavos = valor em reais * 100
// - Valor em reais = valor em centavos / 100

/**
 * Converte um valor monetário em reais(BRL) a ser convertido
 * @param {string}amount - valor monetário em reais(BRL) a ser convertido
 * @returns {number} O valor convertido em centavos
 * @example convertRealToCents("1.300,90") // Retorna 130090
 */
export function convertRealToCents(amount: string) {
    const numericValue = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const priceInCents = Math.round(numericValue * 100)

    return priceInCents
}