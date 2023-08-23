import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const authClient = await AuthClient.create()

if (await authClient.isAuthenticated()) {
  handleAuthentication(authClient)
} else
  await authClient.login({
    // identity provider address is pointing to localhost at the moment
    // when deploying to mainnet change to 
    // identityProvider: "https://identity.ic0.app/#authorize",
    identityProvider: "http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai",
    maxTimeToLive: BigInt(60 * 1000 * 1000 * 1000),
    onSuccess: () => {
      handleAuthentication(authClient)
    }
  })

async function handleAuthentication(authClient) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
