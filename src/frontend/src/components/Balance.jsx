import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { backend } from "../../../declarations/backend"

function Balance() {
    const [inputValue, setInput] = useState("")
    const [balance, setBalance] = useState(0)
    const [symbol, setSymbol] = useState("")

    async function handleClick() {
        if (!inputValue) return
        const principal = Principal.fromText(inputValue)
        const balance = await backend.balanceOf(principal)
        const symbol = await backend.getSymbol()
        setBalance(balance.toLocaleString())
        setSymbol(symbol)
    }


    return (
        <div className="window white">
            <label>Check account token balance:</label>
            <p>
                <input
                    id="balance-principal-id"
                    type="text"
                    placeholder="Enter a Principal ID"
                    value={inputValue}
                    onChange={e => setInput(e.target.value)}
                />
            </p>
            <p className="trade-buttons">
                <button
                    id="btn-request-balance"
                    onClick={handleClick}
                >
                    Check Balance
                </button>
            </p>
            {balance.length > 0 ? <p>This account has a balance of {balance} {symbol}.</p> : ""}
        </div>
    );
}

export default Balance;
