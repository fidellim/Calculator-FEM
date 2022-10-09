import Button from './Button'
import { keys } from '../constants'
import ToggleSwitch from './ToggleSwitch'
import { Context } from '../App'
import { useContext } from 'react'

const Calculator = () => {
    const { calculator } = useContext(Context)
    // console.log(calculator)

    return (
        <div className="flex flex-col gap-6 w-[475px] max-w-full">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-default mt-[20px]">calc</h1>
                </div>
                <ToggleSwitch />
            </div>
            <div className="flex flex-col gap-2 text-right bg-screenBackground rounded-lg w-full p-5 text-default">
                <div
                    className={`bg-delResetBackground text-delResetText text-[20px] rounded-md min-h-[46px] ${
                        !calculator.calculation && 'opacity-0'
                    } transition-all ease-in`}
                >
                    <p className="py-2 px-4 overflow-y-auto scrollbarStyleOne">
                        {calculator.calculation}
                    </p>
                </div>
                <p
                    id="display"
                    className="py-2 px-4 leading-[.9] overflow-y-auto scrollbarStyleTwo"
                >
                    {calculator.currNum}
                </p>
            </div>
            <div className="grid grid-cols-4 gap-5 bg-keypadBackground p-5 rounded-lg">
                {keys.map((key) => {
                    const { id, value } = key
                    return <Button key={id} value={value} id={id} />
                })}
            </div>
        </div>
    )
}

export default Calculator
