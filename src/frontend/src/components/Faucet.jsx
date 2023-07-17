import React, { useState } from "react";
import { backend, canisterId, createActor } from '../../../declarations/backend'
import { AuthClient } from '@dfinity/auth-client';

function Faucet({ userPrincipal }) {
    const [isDisabled, setDisabled] = useState(false)
    const [btnText, setBtnText] = useState("Gimme fimme")

    async function handleClick(event) {
        setDisabled(true)

        // custom Function created under /lib/GetUser which does the same thing as below
        const authClient = await AuthClient.create()
        const identity = await authClient.getIdentity()
        const authenticatedCanister = createActor(canisterId, {
            agentOptions: { identity }
        })

        const btnText = await authenticatedCanister.payOut()
        // const btnText = await backend.payOut()
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
            <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to {userPrincipal}.</label>
            <p className="trade-buttons">
                <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
                    {btnText}
                </button>
            </p>
        </div>
    );
}

export default Faucet;
