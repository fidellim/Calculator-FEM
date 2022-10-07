import React, { useEffect } from 'react'

const ToggleSwitch = () => {
    useEffect(() => {
        document
            .querySelector('.toggleSwitch')
            .addEventListener('click', function (event) {
                if (event.target.tagName.toLowerCase() == 'input') {
                    let input = event.target
                    let slider = this.querySelector('.toggleSwitchDiv')
                    let labels = this.querySelectorAll('.toggleLabel')

                    slider.style.transform = `translateX(${input.dataset.location})`
                    labels.forEach(function (label) {
                        if (label == input.parentElement) {
                            label.classList.add('selected')
                            console.log(input.value)
                        } else {
                            label.classList.remove('selected')
                        }
                    })
                }
            })
    }, [])

    return (
        <div className="flex flex-col">
            <div>
                <label htmlFor="one">1</label>
                <label htmlFor="two">2</label>
                <label htmlFor="three">3</label>
            </div>
            <div className="toggleSwitch">
                <div className="toggleSwitchDiv"></div>
                <label className="toggleLabel selected">
                    <input
                        type="radio"
                        id="one"
                        name="searchtype"
                        data-location="0"
                        value="one"
                    />
                    <div>One</div>
                </label>
                <label className="toggleLabel">
                    <input
                        type="radio"
                        id="two"
                        name="searchtype"
                        data-location="calc(100% - 8px)"
                        value="two"
                    />
                    <div>Two</div>
                </label>
                <label className="toggleLabel">
                    <input
                        type="radio"
                        id="three"
                        name="searchtype"
                        data-location="calc(200% - 12px)"
                        value="three"
                    />
                    <div>Three</div>
                </label>
            </div>
        </div>
    )
}

export default ToggleSwitch
