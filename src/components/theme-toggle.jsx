import { useTheme } from './theme-provider'
    import { Icons } from './icons'

    export function ThemeToggle() {
      const { theme, setTheme } = useTheme()

      return (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <Icons.sun className="h-5 w-5" />
          ) : (
            <Icons.moon className="h-5 w-5" />
          )}
        </button>
      )
    }
