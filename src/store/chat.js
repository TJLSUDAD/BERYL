import { create } from 'zustand'
    import { persist } from 'zustand/middleware'
    import { useSettingsStore } from './settings'

    export const useChatStore = create(
      persist(
        (set, get) => ({
          messages: [],
          addMessage: (message) =>
            set((state) => ({ messages: [...state.messages, message] })),
          clearChat: () => set({ messages: [] }),
          sendMessage: async (input) => {
            const apiKey = useSettingsStore.getState().apiKey
            if (!apiKey) {
              alert('Please enter your API key in settings')
              return
            }
            try {
              const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                      {
                        role: 'user',
                        content: input,
                      },
                    ],
                  }),
                },
              )
              if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message)
              }
              const data = await response.json()
              const content = data.choices[0].message.content
              set((state) => ({
                messages: [...state.messages, { role: 'assistant', content }],
              }))
            } catch (error) {
              set((state) => ({
                messages: [
                  ...state.messages,
                  { role: 'assistant', content: `Error: ${error.message}` },
                ],
              }))
            }
          },
        }),
        {
          name: 'beryl-chat-storage',
        },
      ),
    )
