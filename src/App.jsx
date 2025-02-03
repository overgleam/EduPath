import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from "@/components/theme-provider"

import { DarkModeToggle } from "@/components/DarkModeToggle"
import { AuroraText } from "@/components/ui/aurora-text"
import EduPathDataForm from "@/components/EduPathDataForm"
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center py-10">
        <DarkModeToggle />
        <AuroraText className="text-4xl font-bold mb-8">EduPath</AuroraText>
        <EduPathDataForm />
      </div>
      <ToastContainer position='bottom-left' />
    </ThemeProvider>
  );
}

export default App;