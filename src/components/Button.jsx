import { Context } from '../App'
import { useContext, useRef } from 'react'

const Button = ({ value }) => {
    const { setCalculator, calculator } = useContext(Context)
    const buttonRef = useRef()

    const EQUALS = '=',
        RESET = 'RESET',
        DELETE = 'DEL',
        SPACE = ' ',
        NEGATIVE = '-'

    const isKeyResetOrEqual = (val) =>
        val.toUpperCase() === RESET || val.toUpperCase() === EQUALS

    const isKeyResetOrDelete = (val) =>
        val.toUpperCase() === RESET || val.toUpperCase() === DELETE

    const isKeyEquals = (val) => val.toUpperCase() === EQUALS

    const buttonColor = (val) => {
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

    const handleButton = () => {
        const { innerHTML: buttonValue } = buttonRef.current

        // Check if button is number
        // Check decimals
        //    - there should be one decimal only
        //    - if current value is zero, append it with decimal not replace
        // Check "-"
        if (Number.isInteger(Number(buttonValue)) || buttonValue === NEGATIVE) {
            if (calculator.currNum === '0') {
                setCalculator((prev) => ({
                    ...prev,
                    currNum: buttonRef.current.innerHTML,
                }))
            } else {
                setCalculator((prev) => ({
                    ...prev,
                    currNum: prev.currNum + buttonValue,
                }))
            }
            return
        }

        // Delete last character
        // If there is only one character, change it to "0"
        if (buttonValue === DELETE) {
            setCalculator((prev) => {
                if (prev.currNum.length > 1) {
                    return {
                        ...prev,
                        currNum: prev.currNum.slice(0, -1),
                    }
                }
                return {
                    ...prev,
                    currNum: '0',
                }
            })
        }

    }

    return (
        <div className={`relative ${checkColSpan(value)}`}>
            <button
                className={`${buttonColor(
                    value
                )} keypad z-20 relative rounded sm:rounded-lg text-center hover:translate-y-[.35rem] active:translate-y-[.35rem] h-[48px] w-full flex justify-center items-center`}
                onClick={handleButton}
            >
                <h2 ref={buttonRef} className="leading-[1] pt-3 pb-1">
                    {value.toUpperCase()}
                </h2>
            </button>
            <div
                className={`${bottomColor(
                    value
                )} absolute inset-x-0 -bottom-[5px] rounded-b sm:rounded-b-lg h-[20px] w-full`}
            />
        </div>
    )
}

export default Button
