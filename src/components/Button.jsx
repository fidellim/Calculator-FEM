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

    const buttonColor = (val) => {
        let res = ''

        if (isKeyResetOrDelete(val)) {
            res += `bg-delResetBackground${SPACE}text-delResetText`
        } else if (isKeyEquals(val)) {
            res += `bg-equalBackground${SPACE}text-equalText`
        } else {
            res += `bg-keyBackground${SPACE}text-keyText`
        }

        return res
    }

    const bottomColor = (val) => {
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

    const checkColSpan = (val) => {
        let res = ''

        if (isKeyResetOrEqual(val)) res += `col-span-2${SPACE}`
        return res
    }
    // hover: shadow - [inset_0_0_0_10em_rgba(255, 255, 255, 0.3)]

    return (
        <div className={`relative ${checkColSpan(value)}`}>
            <div
                className={`${buttonColor(
                    value
                )} keypad z-20 relative rounded-lg text-center py-2 hover:translate-y-[.35rem] active:translate-y-[.35rem] `}
            >
                {value.toUpperCase()}
            </div>
            <div
                className={`${bottomColor(
                    value
                )} absolute inset-x-0 -bottom-[5px] rounded-b-lg h-[20px] w-full`}
            />
        </div>
    )
}

export default Button
