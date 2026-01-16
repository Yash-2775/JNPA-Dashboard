import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './pages/layout/DashboardLayout';
import ContainerTerminals from './pages/ContainerTerminals';
import VesselReport from './pages/VesselReport';
import YardInventory from './pages/YardInventory';
import CFSPendency from './pages/CFSPendency';
import ICD_Pendency from './pages/ICDPendency';
import GateMovement from './pages/GateMovement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wraps all child routes */}
        <Route element={<DashboardLayout />}>
          {/* Redirect base URL to the default page */}
          <Route path="/" element={<Navigate to="/container-terminals" replace />} />
          
          {/* Ensure these paths match the 'to' attribute in your NavLinks */}
          <Route path="container-terminals" element={<ContainerTerminals />} />
          <Route path="vessel-report" element={<VesselReport />} />
          <Route path="yard-inventory" element={<YardInventory />} />
          <Route path="cfs-pendency" element={<CFSPendency />} />
          <Route path="icd-pendency" element={<ICD_Pendency />} />
          <Route path="gate-movement" element={<GateMovement />} />
        </Route>

        {/* Optional: Catch-all route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}