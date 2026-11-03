/**
 * Verifica se a data e a mesma agora
 * @param slotTime 
 * @returns booleam
 */
export function isToday(date: Date) {

    console.log("schedule utlis", date)

    const now = new Date()

    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}



/**
 * Verifica se determinado slot"Hora" já passou
 * @param slotTime 
 * @returns booleam
 */
export function isSlotInThePast(slotTime: string) {

    const [slotHour, slotMinute] = slotTime.split(":").map(Number)

    const now = new Date()

    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()



    if (slotHour < currentHour) {
        return true
    } else if (slotHour === currentHour && slotMinute <= currentMinute) {
        return true
    }

    return false

}

export function isSlotSequenceAvailable(
    starSlot: string, // Primeiro horario disponivel
    requiredSlots: number, // Quantidade de slots necessarios
    allSlots: string[], // Todos horarios da clinicas
    blockedSlots: string[] // Horarios bloqueados
) {



    const startIndex = allSlots.indexOf(starSlot)


    if (startIndex === -1 || startIndex + requiredSlots > allSlots.length) {
        return false
    }

    for (let i = startIndex; i < startIndex + requiredSlots; i++) {
        const slotTime = allSlots[i]

        if (blockedSlots.includes(slotTime)) {
            return false
        }
    }
    return true

}


