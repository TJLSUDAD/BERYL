import { create } from 'zustand'
    import { persist } from 'zustand/middleware'
    import { useChatStore } from './chat'

    export const useSettingsStore = create(
      persist(
        (set) => ({
          apiKey: '',
          setApiKey: (apiKey) => set({ apiKey }),
          clearChat: () => {
            useChatStore.getState().clearChat()
          },
        }),
        {
          name: 'beryl-settings-storage',
        },
      ),
    )
