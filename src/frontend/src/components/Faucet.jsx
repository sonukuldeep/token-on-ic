import React, { useState } from "react";
import { backend } from '../../../declarations/backend'
function Faucet() {
    const [isDisabled, setDisabled] = useState(false)
    const [btnText, setBtnText] = useState("Gimme fimme")

    async function handleClick(event) {
        setDisabled(true)
        const btnText = await backend.payOut()
        setBtnText(btnText)
    }

    return (
        <div className="blue window">
            <h2>
                <span role="img" aria-label="tap emoji">
                    🚰
                </span>
                Faucet
            </h2>
            <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
            <p className="trade-buttons">
                <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
                    {btnText}
                </button>
            </p>
        </div>
    );
}

export default Faucet;
