const FORMAT_CURRENCY = Intl.NumberFormat("pt-BR", {
    currency: 'BRL',
    style: 'currency',
    maximumFractionDigits: 2
})


export function formatCurrency(currency: number) {

    return FORMAT_CURRENCY.format(currency)
}

