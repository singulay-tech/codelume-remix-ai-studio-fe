import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>}>
    <App />
  </Suspense>
)
