import { RouterProvider } from 'react-router-dom'
    import { Toaster } from 'sonner'
    import { router } from './router'
    import { ThemeProvider } from './components/theme-provider'

    function App() {
      return (
        <ThemeProvider defaultTheme="dark" storageKey="beryl-theme">
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      )
    }

    export default App
