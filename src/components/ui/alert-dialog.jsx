import * as React from 'react'
    import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
    import { cn } from '../../lib/utils'

    const AlertDialog = AlertDialogPrimitive.Root
    const AlertDialogTrigger = AlertDialogPrimitive.Trigger
    const AlertDialogContent = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay
              className={cn(
                'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              )}
            />
            <AlertDialogPrimitive.Content
              ref={ref}
              className={cn(
                'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2 sm:rounded-lg',
                className,
              )}
              {...props}
            />
          </AlertDialogPrimitive.Portal>
        )
      },
    )
    AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

    const AlertDialogHeader = ({ className, ...props }) => {
      return (
        <div
          className={cn(
            'flex flex-col space-y-2 text-center sm:text-left',
            className,
          )}
          {...props}
        />
      )
    }
    AlertDialogHeader.displayName = 'AlertDialogHeader'

    const AlertDialogFooter = ({ className, ...props }) => {
      return (
        <div
          className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className,
          )}
          {...props}
        />
      )
    }
    AlertDialogFooter.displayName = 'AlertDialogFooter'

    const AlertDialogTitle = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <AlertDialogPrimitive.Title
            ref={ref}
            className={cn('text-lg font-semibold leading-none', className)}
            {...props}
          />
        )
      },
    )
    AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

    const AlertDialogDescription = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <AlertDialogPrimitive.Description
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
          />
        )
      },
    )
    AlertDialogDescription.displayName =
      AlertDialogPrimitive.Description.displayName

    const AlertDialogAction = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <AlertDialogPrimitive.Action
            ref={ref}
            className={cn(
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
              className,
            )}
            {...props}
          />
        )
      },
    )
    AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

    const AlertDialogCancel = React.forwardRef(
      ({ className, ...props }, ref) => {
        return (
          <AlertDialogPrimitive.Cancel
            ref={ref}
            className={cn(
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
              className,
            )}
            {...props}
          />
        )
      },
    )
    AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

    export {
      AlertDialog,
      AlertDialogTrigger,
      AlertDialogContent,
      AlertDialogHeader,
      AlertDialogFooter,
      AlertDialogTitle,
      AlertDialogDescription,
      AlertDialogAction,
      AlertDialogCancel,
    }
