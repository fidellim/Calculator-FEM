import Calculator from './components/Calculator'
import { createContext, useState } from 'react'

const Context = createContext()

function App() {
    const [theme, setTheme] = useState('')
    const [calculator, setCalculator] = useState({
        prevNum: undefined,
        currNum: '0',
        operation: undefined,
    })

    return (
        <>
            <Context.Provider value={{ setTheme, calculator, setCalculator }}>
                <div
                    className={`${theme} bg-mainBackground min-w-screen min-h-screen`}
                >
                    <p>
                        {JSON.stringify(calculator, function (k, v) {
                            return v === undefined ? null : v
                        })}
                    </p>
                    <main className="flex justify-center items-center min-h-screen p-5">
                        <Calculator />
                    </main>
                </div>
            </Context.Provider>
        </>
    )
}

export default App
export { Context }
