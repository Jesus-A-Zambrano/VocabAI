import { Route, Routes } from "react-router";
import DefaultLayout from "./components/layout/DefaultLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
