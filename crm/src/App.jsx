import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Socios from "./pages/Socios";
import SocioDetalle from "./pages/SocioDetalle";
import Empresas from "./pages/Empresas";
import Pipeline from "./pages/Pipeline";
import Ofertas from "./pages/Ofertas";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/socios/:id" element={<SocioDetalle />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/ofertas" element={<Ofertas />} />
      </Route>
    </Routes>
  );
}

export default App;
