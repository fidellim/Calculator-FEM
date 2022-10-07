import React, { useEffect } from 'react'
import Button from './Button'
import { keys } from '../constants'
import ToggleSwitch from './ToggleSwitch'

const Calculator = () => {
    return (
        <div className="flex flex-col gap-4 w-[500px]">
            <div className="flex justify-between">
                <h1 className="text-default">calc</h1> <ToggleSwitch />
            </div>
            <input
                type="text"
                className="text-right bg-screenBackground rounded-lg w-full p-5 text-default"
            />
            <div className="grid grid-cols-4 gap-4 bg-keypadBackground p-5 rounded-lg">
                {keys.map((key) => (
                    <Button key={key.keyCode} value={key.value} />
                ))}
            </div>
        </div>
    )
}

export default Calculator
