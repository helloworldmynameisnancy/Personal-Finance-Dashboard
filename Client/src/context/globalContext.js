import React, { useContext, useState } from 'react'
import axios from "axios";


const BASE_URL = "http://localhost:5050/api/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [income, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const addIncome = async(income)=> {
        const response = await axios.post('${BASE_URL}add-income', income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
    }
    return (
        <GlobalContext.Provider value={{
            addIncome,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}