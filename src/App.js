import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { browserHistory } from 'react-router'
import DataSet from "./pages/DataSet";
import CustomerInfo from "./components/Content/CustomerInfo";
import { Layout, Menu } from "antd";
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact>
                  <DataSet />
                </Route>
                <Route
                  history={browserHistory}
                  path="/detail"
                  exact
                  component={CustomerInfo}
                />
              </Switch>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
