import { Routes, Route } from "react-router-dom";

import ContainerTerminals from "./pages/ContainerTerminals";
import VesselReport from "./pages/VesselReport";
import YardInventory from "./pages/YardInventory";
import CFSPendency from "./pages/CFSPendency";
import ICDPendency from "./pages/ICDPendency";
import GateMovement from "./pages/GateMovement";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ContainerTerminals />} />
      <Route path="/container-terminals" element={<ContainerTerminals />} />
      <Route path="/vessel-report" element={<VesselReport />} />
      <Route path="/yard-inventory" element={<YardInventory />} />
      <Route path="/cfs-pendency" element={<CFSPendency />} />
      <Route path="/icd-pendency" element={<ICDPendency />} />
      <Route path="/gate-movement" element={<GateMovement />} />
    </Routes>
  );
}
