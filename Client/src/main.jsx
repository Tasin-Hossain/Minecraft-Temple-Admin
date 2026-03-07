import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Admin/Components/Themes/ThemeContext.jsx";
import { AdminThemeProvider } from "./Admin/Components/Themes/AdminThemeContext.jsx";
import { store, persistor } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading app...</div>} persistor={persistor}>
      <ThemeProvider>
        <AdminThemeProvider>
          <App />
          <ToastContainer autoClose={4000} hideProgressBar={true} toastClassName="toast" closeButton={false}/>
        </AdminThemeProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
