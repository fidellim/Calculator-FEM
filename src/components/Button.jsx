import React from 'react'

const Button = ({ value }) => {
    const EQUALS = '=',
        RESET = 'RESET',
        DELETE = 'DEL',
        SPACE = ' '

    const isKeyResetOrEqual = (val) =>
        val.toUpperCase() === RESET || val.toUpperCase() === EQUALS

    const isKeyResetOrDelete = (val) =>
        val.toUpperCase() === RESET || val.toUpperCase() === DELETE

    const isKeyEquals = (val) => val.toUpperCase() === EQUALS

    const checkValue = (val) => {
        let res = ''

        if (isKeyResetOrEqual(val)) {
            res += `col-span-2${SPACE}`
        }

        if (isKeyResetOrDelete(val)) {
            res += `bg-delResetBackground${SPACE}text-delResetText`
        } else if (isKeyEquals(val)) {
            res += `bg-equalBackground${SPACE}text-white`
        } else {
            res += `bg-keyBackground${SPACE}text-keyText`
        }

        return res
    }

    return (
        <div className={`${checkValue(value)} rounded-lg text-center py-2`}>
            {value.toUpperCase()}
        </div>
    )
}

export default Button
