'use client';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/store/store';
import { Provider } from 'react-redux';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster richColors position="top-right" />
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

export default Wrapper;
