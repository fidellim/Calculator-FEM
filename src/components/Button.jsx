import { Context } from '../App'
import { useContext, useRef } from 'react'
import {
    checkColSpan,
    bottomColor,
    buttonColor,
    EQUALS,
    RESET,
    DELETE,
    SPACE,
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
        if (Number.isInteger(Number(buttonValue))) {
            if (calculator.currNum === '0') {
                if (calculator.operation && !calculator.prevNum) {
                    setCalculator((prev) => ({
                        ...prev,
                        // prevNum: prev.currNum,
                        currNum: buttonValue,
                        calculation: prev.calculation + buttonValue,
                    }))
                } else {
                    let tempVal = ''
                    if (buttonValue === NEGATIVE) tempVal = '-0'
                    else tempVal = buttonValue

                    setCalculator((prev) => ({
                        ...prev,
                        currNum: tempVal,
                        calculation: tempVal,
                    }))
                }
            } else {
                // check if statement has equals
                if (calculator.calculation.includes(EQUALS)) {
                    setCalculator((prev) => ({
                        ...prev,
                        currNum: buttonValue,
                        calculation: buttonValue,
                        operation: undefined,
                    }))
                } else {
                    // check if operation has a value already and prevNum is still empty
                    // if (calculator.operation && !calculator.prevNum) {
                    //     setCalculator((prev) => ({
                    //         ...prev,
                    //         prevNum: prev.currNum,
                    //         currNum: buttonValue,
                    //         calculation: buttonValue,
                    //     }))
                    // } else {
                    // Check if val is -0
                    let tempVal = ''
                    if (calculator.currNum === '-0') tempVal = `-${buttonValue}`
                    else if (OPERATIONS.includes(calculator.currNum))
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
            const lastChar = calculator.calculation.at(-1)

            if (OPERATIONS.includes(lastChar)) {
                setCalculator((prev) => ({
                    ...prev,
                    currNum: buttonValue,
                    calculation: prev.calculation.slice(0, -1) + buttonValue,
                }))

                //check if operation is same
                // if not change operation
                // console.log(
                //     eval(
                //         `${calculator.prevNum} ${calculator.operation} ${calculator.currNum}`
                //     )
                // )
                // check if buttonValue is minus
                // if minus, allow
                // else override the operation
                // if (buttonValue === NEGATIVE) {
                //     setCalculator((prev) => ({
                //         ...prev,
                //         currNum: tempVal,
                //         calculation: tempVal,
                //     }))
                // }
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
                    calculation: prev.calculation.slice(0, -1) + '0',
                    currNum: '0',
                }
            })
        }

        // Reset values
        if (buttonValue === RESET) {
            setCalculator({
                prevNum: undefined,
                currNum: '0',
                operation: undefined,
                calculation: undefined,
            })
        }

        if (buttonValue === EQUALS) {
            // check if the statement has equals
            if (calculator.calculation.includes(EQUALS)) return

            // check if the last character in the calculation is an operation
            const lastChar = calculator.calculation.at(-1)
            let statement = calculator.calculation
            if (OPERATIONS.includes(lastChar) || lastChar === NEGATIVE)
                statement = calculator.calculation.slice(0, -1)

            // replace multiplication character to x/*
            statement = statement.replaceAll(/×/g, '*')

            const answer = eval(statement)
            console.log(answer)
            setCalculator({
                currNum: answer,
                calculation: `${statement}${EQUALS}${answer}`,
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
