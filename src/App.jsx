import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"

import { DarkModeToggle } from "@/components/DarkModeToggle"
import { AuroraText } from "@/components/ui/aurora-text"
import EduPathDataForm from "@/components/EduPathDataForm"
import PredictionResult from '@/components/PredictionResult';
import { ToastContainer } from 'react-toastify';
import { TextAnimate } from '@/components/ui/text-animate';
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen flex flex-col items-center py-6">
          <div className="flex flex-row items-end mb-6 justify-around w-1/4 ">
            <img src={'/logo.svg'} alt="EduPath" className="w-20 h-20 " />
            <AuroraText className="text-5xl font-bold font-marko">EduPath</AuroraText>
          </div>
          <TextAnimate animation="blurInUp" by="character" className="text-gray-700 dark:text-gray-300 text-lg pb-4">Discover your ideal educational journey with ML-powered course recommendations and success predictions.</TextAnimate>
          <DarkModeToggle />
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