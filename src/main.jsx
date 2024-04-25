import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
