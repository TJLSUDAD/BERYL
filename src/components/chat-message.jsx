import ReactMarkdown from 'react-markdown'
    import rehypeRaw from 'rehype-raw'
    import remarkGfm from 'remark-gfm'
    import { Icons } from './icons'
    import { Button } from './ui/button'
    import { useToast } from './ui/use-toast'

    export function ChatMessage({ message }) {
      const { toast } = useToast()

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(message.content)
          toast({
            title: 'Copied to clipboard',
          })
        } catch (error) {
          toast({
            title: 'Failed to copy',
            variant: 'destructive',
          })
        }
      }

      return (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.role === 'user'
              ? 'bg-gray-100 dark:bg-gray-700 text-right'
              : 'bg-gray-200 dark:bg-gray-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {message.role === 'user' ? 'You' : 'Bot'}
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Icons.copy className="h-4 w-4" />
            </Button>
          </div>
          <ReactMarkdown
            className="prose dark:prose-invert mt-2"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            children={message.content}
          />
        </div>
      )
    }
