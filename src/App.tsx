import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import RouteComponent from "./routes";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

interface UserDataInterface {
  email: string;
  password: string;
}

const store = createStore<UserDataInterface>({
  authName: "_auth",
  authType: "localstorage",
  // cookieDomain: window.location.hostname,
  // cookieSecure: window.location.protocol === "https:",
});

function App() {
  return (
    <AuthProvider store={store}>
      <ConfigProvider>
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
