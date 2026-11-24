export const PLANS = {
    BASIC: {
        maxServices: 4
    },
    PROFESSIONAL: {
        maxServices: 40
    },
}


export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basico",
        description: "Perfeito para clinicas menores",
        oldPrice: "R$ 97,90",
        price: "R$ 47,90",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            "Agendamentos ilimitados",
            "Suporte",
            "Relatórios",
        ]

    },
    {
        id: "PROFESSIONAL",
        name: "Profissional",
        description: "Ideal para clinicas grandes",
        oldPrice: "R$ 149,90",
        price: "R$ 89,90",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            "Agendamentos ilimitados",
            "Suporte Personalizado 24h",
            "Relatórios e Planilhas",
        ]

    }


]