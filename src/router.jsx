import { createBrowserRouter } from 'react-router-dom'
    import { Chat } from './pages/chat'
    import { Settings } from './pages/settings'
    import { Layout } from './components/layout'

    export const router = createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Chat />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
    ])
