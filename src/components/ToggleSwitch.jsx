import React, { useEffect, useContext, useRef } from 'react'
import { Context } from '../App'

const ToggleSwitch = () => {
    const { setTheme } = useContext(Context)
    const ONE = '1',
        TWO = '2',
        THREE = '3'

    const radioOne = useRef()
    const radioTwo = useRef()
    const radioThree = useRef()

    useEffect(() => {
        const changeTheme = (inputReference) => {
            let slider = document.querySelector('.toggleSwitchDiv')
            let labels = document.querySelectorAll('.toggleLabel')

            labels.forEach((label) => {
                if (label === inputReference.parentElement) {
                    label.classList.add('selected')
                    const { value } = inputReference
                    if (value === ONE) {
                        setTheme('')
                        slider.style.transform = `translate(calc(0% + 5px), -50%) scale(0.7)`
                    } else if (value === TWO) {
                        setTheme('theme-light')
                        slider.style.transform = `translate(100%, -50%) scale(0.7)`
                    } else if (value === THREE) {
                        setTheme('theme-purple')
                        slider.style.transform = `translate(calc(200% - 5px), -50%) scale(0.7)`
                    }
                } else {
                    label.classList.remove('selected')
                }
            })
        }

        const handleClick = (event) => {
            if (event.target.tagName.toLowerCase() === 'input') {
                let input = event.target
                changeTheme(input)
            }
        }

        document
            .querySelector('.toggleSwitch')
            .addEventListener('click', handleClick)

        // CLEANUP FUNCTION
        return () =>
            document
                .querySelector('.toggleSwitch')
                .removeEventListener('click', handleClick)
    }, [setTheme])

    return (
        <div className="flex items-center justify-center text-default text-[12px] gap-5">
            <div className="flex flex-col gap-1">
                <div className="flex-1 min-h-[50%] invisible">_</div>
                <div className="flex items-center flex-1 min-h-[25px] self-end">
                    THEME
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-evenly">
                    <label className="cursor-pointer" htmlFor={ONE}>
                        1
                    </label>
                    <label className="cursor-pointer" htmlFor={TWO}>
                        2
                    </label>
                    <label className="cursor-pointer" htmlFor={THREE}>
                        3
                    </label>
                </div>
                <div className="toggleSwitch rounded-[50px] w-[70px] py-[2.5px] bg-keypadBackground">
                    <div className="toggleSwitchDiv">
                        <div className="bg-equalBackground h-full w-[20px] rounded-full" />
                    </div>
                    <label className="toggleLabel selected">
                        <input
                            type="radio"
                            id={ONE}
                            name="searchtype"
                            data-location="0"
                            value={ONE}
                            ref={radioOne}
                        />
                    </label>
                    <label className="toggleLabel">
                        <input
                            type="radio"
                            id={TWO}
                            name="searchtype"
                            data-location="calc(100%)"
                            value={TWO}
                            ref={radioTwo}
                        />
                    </label>
                    <label className="toggleLabel">
                        <input
                            type="radio"
                            id={THREE}
                            name="searchtype"
                            data-location="calc(200%)"
                            value={THREE}
                            ref={radioThree}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ToggleSwitch
