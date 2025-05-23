import { Route, Routes } from "react-router";
import DefaultLayout from "./components/layout/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AppTarjeta from "./pages/AppTarjeta";
import ProtectedRoute from "./components/UI/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppTarjeta />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
