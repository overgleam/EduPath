import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"

import { DarkModeToggle } from "@/components/DarkModeToggle"
import { AuroraText } from "@/components/ui/aurora-text"
import EduPathDataForm from "@/components/EduPathDataForm"
import PredictionResult from '@/components/PredictionResult';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen flex flex-col items-center py-10">
          <DarkModeToggle />
          <AuroraText className="text-4xl font-bold mb-8">EduPath</AuroraText>
          <Routes>
            <Route path="/" element={<EduPathDataForm />} />
            <Route path="/results" element={<PredictionResult />} />
          </Routes>
        </div>
        <ToastContainer position='bottom-left' />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;