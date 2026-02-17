import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Atendimento from "./pages/atendimento";
import CrmContatos from "./pages/crm-contatos";
import CrmPaineis from "./pages/crm-paineis";
import Campanhas from "./pages/campanhas";
import { AppLayout } from "./Layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Rotas com Layout */}
        <Route element={<AppLayout />}>
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/crm/contatos" element={<CrmContatos />} />
          <Route path="/crm/paineis" element={<CrmPaineis />} />
          <Route path="/campanhas" element={<Campanhas />} />
        </Route>

        {/* 🔄 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
