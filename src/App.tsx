import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { WorkshopPage } from './pages/WorkshopPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
      </Routes>
    </BrowserRouter>
  )
}
