import * as React from 'react'
    import { toast as useToastHook } from 'sonner'

    const ToastContext = React.createContext()

    function ToastProvider({ children }) {
      const toast = useToastHook()
      return (
        <ToastContext.Provider value={{ toast }}>
          {children}
        </ToastContext.Provider>
      )
    }

    function useToast() {
      return React.useContext(ToastContext)
    }

    export { ToastProvider, useToast }
