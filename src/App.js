import Calculator from './components/Calculator'
import { createContext, useState } from 'react'

const Context = createContext()

function App() {
    const [theme, setTheme] = useState('')

    return (
        <>
            <Context.Provider value={{ setTheme }}>
                <div
                    className={`${theme} bg-mainBackground min-w-screen min-h-screen`}
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
