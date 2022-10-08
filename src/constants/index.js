export const keys = [
    {
        keyCode: 55,
        value: '7',
        id: 'seven',
    },
    {
        keyCode: 56,
        value: '8',
        id: 'eight',
    },
    {
        keyCode: 57,
        value: '9',
        id: 'nine',
    },
    {
        keyCode: 46,
        value: 'Del',
        id: 'delete',
    },
    {
        keyCode: 52,
        value: '4',
        id: 'four',
    },
    {
        keyCode: 53,
        value: '5',
        id: 'five',
    },
    {
        keyCode: 54,
        value: '6',
        id: 'six',
    },
    {
        keyCode: 107,
        value: '+',
        id: 'add',
    },
    {
        keyCode: 49,
        value: '1',
        id: 'one',
    },
    {
        keyCode: 50,
        value: '2',
        id: 'two',
    },
    {
        keyCode: 51,
        value: '3',
        id: 'three',
    },
    {
        keyCode: 189,
        value: '-',
        id: 'subtract',
    },
    {
        keyCode: 190,
        value: '.',
        id: 'decimal',
    },
    {
        keyCode: 48,
        value: '0',
        id: 'zero',
    },
    {
        keyCode: 191,
        value: '/',
        id: 'divide',
    },
    {
        keyCode: 106,
        value: '×',
        id: 'multiply',
    },
    {
        keyCode: 27,
        value: 'Reset',
        id: 'clear',
    },
    {
        keyCode: 187,
        value: '=',
        id: 'equals',
    },
]

export const EQUALS = '=',
    RESET = 'RESET',
    DELETE = 'DEL',
    SPACE = ' ',
    NEGATIVE = '-',
    OPERATIONS = '+-×/'

export const isKeyResetOrEqual = (val) =>
    val.toUpperCase() === RESET || val.toUpperCase() === EQUALS

export const isKeyResetOrDelete = (val) =>
    val.toUpperCase() === RESET || val.toUpperCase() === DELETE

export const isKeyEquals = (val) => val.toUpperCase() === EQUALS

export const buttonColor = (val) => {
    let res = ''

    if (isKeyResetOrDelete(val)) {
        res += `bg-delResetBackground${SPACE}text-delResetText${SPACE}text-[20px]`
    } else if (isKeyEquals(val)) {
        res += `bg-equalBackground${SPACE}text-equalText${SPACE}text-[20px]`
    } else {
        res += `bg-keyBackground${SPACE}text-keyText`
    }

    return res
}

export const bottomColor = (val) => {
    let res = ''

    if (isKeyResetOrDelete(val)) {
        res += `bg-delResetBackgroundShadow`
    } else if (isKeyEquals(val)) {
        res += `bg-equalBackgroundShadow`
    } else {
        res += `bg-keyBackgroundShadow`
    }

    return res
}

export const checkColSpan = (val) => {
    let res = ''

    if (isKeyResetOrEqual(val)) res += `col-span-2${SPACE}`
    return res
}
