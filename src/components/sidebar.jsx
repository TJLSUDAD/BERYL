import { NavLink } from 'react-router-dom'
    import { Icons } from './icons'
    import { ThemeToggle } from './theme-toggle'

    export function Sidebar() {
      return (
        <div className="flex flex-col w-64 border-r p-4">
          <div className="mb-4">
            <div className="text-2xl font-bold text-yellow-500">BERYL AI</div>
          </div>
          <nav className="flex-1">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                        : 'text-gray-500 dark:text-gray-400'
                    }`
                  }
                >
                  <Icons.chat className="h-4 w-4 mr-2" />
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                        : 'text-gray-500 dark:text-gray-400'
                    }`
                  }
                >
                  <Icons.settings className="h-4 w-4 mr-2" />
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="border-t pt-4">
            <ThemeToggle />
          </div>
        </div>
      )
    }
