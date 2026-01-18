import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        {/* Placeholder for history page */}
                        <Route path="history" element={<div className="text-center text-slate-500 mt-10">History Coming Soon</div>} />
                        {/* Catch all redirect to home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
