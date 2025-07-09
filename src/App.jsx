import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <BrowserRouter>
              <Layout>
                <Router />
              </Layout>
            </BrowserRouter>
          </SnackbarProvider>
        </CustomThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
