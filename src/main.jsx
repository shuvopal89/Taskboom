import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import { DesignContextProvider } from "./context/DesignContext.jsx";
import { ServerContextProvider } from "./context/ServerContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="704957910834-9hjjb21a2794rq6psi5b6ubmibsbpd50.apps.googleusercontent.com">
    <Provider store={store}>
      <ServerContextProvider>
        <DesignContextProvider>
          <App />
          <Toaster
            position="bottom-center"
          />
        </DesignContextProvider>
      </ServerContextProvider>
    </Provider>
  </GoogleOAuthProvider>
);
