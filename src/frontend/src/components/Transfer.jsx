import React, { useState } from "react";
import { backend } from '../../../declarations/backend'
import { Principal } from '@dfinity/principal';
import { authenticatedCanister } from '../lib/GetUser';

function Transfer() {
    const [amount, setAmount] = useState(0)
    const [recipient, setRecipient] = useState("")
    const [feedbackText, setFeedbackText] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    async function handleClick() {
        setIsDisabled(true)
        setFeedbackText("")
        if (!amount || !recipient) return
        const recipientsPrincipal = Principal.fromText(recipient)
        const response = await authenticatedCanister.transfer(recipientsPrincipal, amount)
        // const response = await backend.transfer(recipientsPrincipal, amount)
        setFeedbackText(response)
        setIsDisabled(false)
    }

    return (
        <div className="window white">
            <div className="transfer">
                <fieldset>
                    <legend>To Account:</legend>
                    <ul>
                        <li>
                            <input
                                type="text"
                                id="transfer-to-id"
                                value={recipient}
                                onChange={e => setRecipient(e.target.value)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Amount:</legend>
                    <ul>
                        <li>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={e => setAmount(() => Number(e.target.value))}
                            />
                        </li>
                    </ul>
                </fieldset>
                <p className="trade-buttons">
                    <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
                        Transfer
                    </button>
                </p>
                <p>{feedbackText}</p>
            </div>
        </div>
    );
}

export default Transfer;
