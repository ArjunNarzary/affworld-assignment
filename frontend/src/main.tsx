import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import { Toaster } from "./components/ui/toaster.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
      >
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
