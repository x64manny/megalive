// ============================================
// MegaLive - Main Entry Point
// ============================================

import { MegaLiveApp } from "@/app";
import { AuthProvider } from "@/contexts";

function App() {
  return (
    <AuthProvider>
      <MegaLiveApp />
    </AuthProvider>
  );
}

export default App;
