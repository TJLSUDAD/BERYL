import * as React from 'react'
    import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
    import { cn } from '../../lib/utils'

    const ScrollArea = React.forwardRef(
      ({ className, children, ...props }, ref) => {
        return (
          <ScrollAreaPrimitive.Root
            ref={ref}
            className={cn('relative overflow-hidden', className)}
            {...props}
          >
            <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
              {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        )
      },
    )
    ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

    const ScrollBar = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <ScrollAreaPrimitive.Scrollbar
            ref={ref}
            className={cn('flex touch-none select-none transition-colors', className)}
            orientation="vertical"
            {...props}
          >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
          </ScrollAreaPrimitive.Scrollbar>
        )
      },
    )
    ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

    export { ScrollArea }
