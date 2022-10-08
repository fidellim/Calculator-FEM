import Button from './Button'
import { keys } from '../constants'
import ToggleSwitch from './ToggleSwitch'
import { Context } from '../App'
import { useContext } from 'react'

const Calculator = () => {
    const { calculator } = useContext(Context)
    // console.log(calculator)

    return (
        <div className="flex flex-col gap-6 w-[475px]">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-default mt-[20px]">calc</h1>
                </div>
                <ToggleSwitch />
            </div>
            <div
                type="text"
                className="text-right bg-screenBackground rounded-lg w-full p-5 text-default"
            >
                {calculator.currNum}
            </div>
            <div className="grid grid-cols-4 gap-5 bg-keypadBackground p-5 rounded-lg">
                {keys.map((key) => (
                    <Button key={key.keyCode} value={key.value} />
                ))}
            </div>
        </div>
    )
}

export default Calculator
