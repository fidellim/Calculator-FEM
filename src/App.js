import Calculator from './components/Calculator'
import { createContext, useState } from 'react'

const Context = createContext()

function App() {
    const [theme, setTheme] = useState('')
    const [calculator, setCalculator] = useState({
        currNum: '0',
        operation: undefined,
        calculation: undefined,
    })

    return (
        <>
            <Context.Provider value={{ setTheme, calculator, setCalculator }}>
                <div
                    className={`${theme} transition-all ease-in bg-mainBackground min-w-screen min-h-screen`}
                >
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
