import { canisterId, createActor } from '../../../declarations/backend'
import { AuthClient } from '@dfinity/auth-client';


const authClient = await AuthClient.create()
const identity = await authClient.getIdentity()
export const authenticatedCanister = createActor(canisterId, {
    agentOptions: { identity }
})