import { Context } from '../App'
import { useContext, useRef } from 'react'
import {
    checkColSpan,
    bottomColor,
    buttonColor,
    EQUALS,
    RESET,
    DELETE,
    DECIMAL,
    NEGATIVE,
    OPERATIONS,
} from '../constants'

const Button = ({ value, id }) => {
    const { setCalculator, calculator } = useContext(Context)
    const buttonRef = useRef()

    const handleButton = () => {
        const { innerHTML: buttonValue } = buttonRef.current

        // Check if button is number
        // Check decimals
        //    - there should be one decimal only
        //    - if current value is zero, append it with decimal not replace
        // Check "-"
        if (Number.isInteger(Number(buttonValue)) || buttonValue === DECIMAL) {
            if (calculator.currNum === '0') {
                let tempVal = ''
                if (buttonValue === DECIMAL) tempVal = '0.'
                else tempVal = buttonValue

                setCalculator((prev) => ({
                    ...prev,
                    currNum: tempVal,
                    calculation: tempVal,
                }))
                // }
            } else {
                // check if statement has equals
                if (calculator.calculation.includes(EQUALS)) {
                    setCalculator((prev) => ({
                        ...prev,
                        currNum: buttonValue,
                        calculation: buttonValue,
                        operation: undefined,
                    }))
                } else if (buttonValue === DECIMAL) {
                    // there should only be one decimal per number
                    if (
                        !calculator.currNum.includes(DECIMAL) &&
                        buttonValue === DECIMAL
                    ) {
                        setCalculator((prev) => {
                            // Check if prev.currNum is operator
                            let isPrevCharOperator = OPERATIONS.includes(
                                prev.currNum
                            )

                            return {
                                ...prev,
                                currNum: isPrevCharOperator
                                    ? '0.'
                                    : prev.currNum + buttonValue,
                                calculation: isPrevCharOperator
                                    ? prev.calculation + '0.'
                                    : prev.calculation + buttonValue,
                                operation: undefined,
                            }
                        })
                    }
                } else {
                    let tempVal = ''
                    if (OPERATIONS.includes(calculator.currNum))
                        tempVal = buttonValue
                    else tempVal = calculator.currNum + buttonValue

                    setCalculator((prev) => ({
                        ...prev,
                        currNum: tempVal,
                        calculation: prev.calculation + buttonValue,
                        operation: undefined,
                    }))
                    // }
                }
            }
            return
        }

        if (OPERATIONS.includes(buttonValue)) {
            let lastChar = undefined
            if (calculator.calculation) lastChar = calculator.calculation.at(-1)

            // if there is still no value but u want to add operation
            if (!lastChar) {
                setCalculator((prev) => ({
                    ...prev,
                    currNum: buttonValue,
                    calculation: buttonValue,
                    operation: buttonValue,
                }))
            } else if (OPERATIONS.includes(lastChar)) {
                let secondLastChar = calculator.calculation.at(-2)

                if (
                    lastChar === '-' &&
                    secondLastChar === '-' &&
                    buttonValue === NEGATIVE
                ) {
                    return
                }

                if (
                    calculator.calculation.length === 1 &&
                    lastChar === '-' &&
                    buttonValue === NEGATIVE
                ) {
                    return
                }

                if (
                    calculator.calculation.length > 1 &&
                    OPERATIONS.includes(secondLastChar) &&
                    lastChar === NEGATIVE &&
                    buttonValue === NEGATIVE
                ) {
                    return
                }

                if (buttonValue === NEGATIVE) {
                    if (calculator.calculation.length === 1) {
                        setCalculator((prev) => ({
                            ...prev,
                            currNum: buttonValue,
                            calculation: buttonValue,
                            operation: buttonValue,
                        }))
                    } else {
                        setCalculator((prev) => ({
                            ...prev,
                            currNum: buttonValue,
                            calculation: prev.calculation + buttonValue,
                            operation: buttonValue,
                        }))
                    }
                } else {
                    setCalculator((prev) => {
                        // if (lastChar === NEGATIVE) {
                        //     const secondLastChar = calculator.calculation.at(-1)
                        //     console.log('secondLastChar: ', secondLastChar)
                        // }

                        // check if last two chars of calculator.calculation are operators
                        // if true, remove last 2 chars and replace with buttonValue
                        if (
                            OPERATIONS.includes(lastChar) &&
                            OPERATIONS.includes(secondLastChar)
                        ) {
                            return {
                                ...prev,
                                currNum: buttonValue,
                                calculation:
                                    prev.calculation.slice(0, -2) + buttonValue,
                                operation: buttonValue,
                            }
                        } else {
                            return {
                                ...prev,
                                currNum: buttonValue,
                                calculation:
                                    prev.calculation.slice(0, -1) + buttonValue,
                                operation: buttonValue,
                            }
                        }
                    })
                }
            } else if (calculator.calculation.includes(EQUALS)) {
                // if calculation has equals
                // set calculation to "currNum + buttonValue"
                // set currNum to "buttonValue"
                setCalculator((prev) => ({
                    ...prev,
                    currNum: buttonValue,
                    calculation: prev.currNum + buttonValue,
                    operation: buttonValue,
                }))
            } else {
                setCalculator((prev) => ({
                    ...prev,
                    currNum: buttonValue,
                    calculation: prev.calculation + buttonValue,
                    operation: buttonValue,
                }))
            }
        }

        // Delete last character
        // If there is only one character, change it to "0"
        if (buttonValue === DELETE) {
            if (!calculator.calculation) return

            setCalculator((prev) => {
                if (prev.currNum.length > 1) {
                    return {
                        ...prev,
                        calculation: prev.calculation.slice(0, -1),
                        currNum: prev.currNum.slice(0, -1),
                    }
                }
                return {
                    ...prev,
                    calculation: prev.calculation.slice(0, -1),
                    currNum: '0',
                }
            })
        }

        // Reset values
        if (buttonValue === RESET) {
            setCalculator({
                currNum: '0',
                operation: undefined,
                calculation: undefined,
            })
        }

        if (buttonValue === EQUALS) {
            // check if first character is equals / calculator.calculation is undefined
            // check if the statement has equals
            if (
                calculator.calculation &&
                calculator.calculation.includes(EQUALS)
            )
                return

            // check if the last character in the calculation is an operation
            const lastChar =
                calculator.calculation && calculator.calculation.at(-1)
            let statement = calculator.calculation || ''
            if (OPERATIONS.includes(lastChar) || lastChar === NEGATIVE)
                statement = calculator.calculation.slice(0, -1)

            // replace multiplication character to x/*
            statement = statement.replaceAll(/×/g, '*')
            //  replace "--" to "- -"
            statement = statement.replaceAll(/--/g, '- -')

            const answer = eval(statement)
            //  replace "- -" to "--"
            statement = statement.replaceAll(/- -/g, '--')
            // console.log(answer)
            setCalculator({
                currNum: String(Number(answer)),
                calculation: `${statement}${EQUALS}${String(Number(answer))}`,
                operation: EQUALS,
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
                <h2 ref={buttonRef} id={id} className="leading-[1] pt-3 pb-1">
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
