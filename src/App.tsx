import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import RouteComponent from "./routes";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <RouteComponent />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
