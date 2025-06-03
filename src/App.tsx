
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/hooks/useTheme';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Upload } from '@/pages/Upload';
import NotFound from './pages/NotFound';
import './index.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="iris-dashboard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<Upload />} />
              <Route path="logs" element={<div className="p-8 text-center text-muted-foreground">Detection Logs - Coming Soon</div>} />
              <Route path="metrics" element={<div className="p-8 text-center text-muted-foreground">Performance Metrics - Coming Soon</div>} />
              <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Settings - Coming Soon</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
