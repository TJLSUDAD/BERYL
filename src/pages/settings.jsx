
    import { useState } from 'react'
    import { useSettingsStore } from '../store/settings'
    import { Input } from '../components/ui/input'
    import { Label } from '../components/ui/label'
    import { Button } from '../components/ui/button'
    import { Icons } from '../components/icons'
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from '../components/ui/alert-dialog'

    export function Settings() {
      const { apiKey, setApiKey, clearChat } = use