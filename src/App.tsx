import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import BuyToken from './pages/BuyToken'
import { useAppStore } from './store/useAppStore'
import { useLivePrices } from './hooks/useLivePrices'

export default function App() {
  useLivePrices()
  const theme = useAppStore(s => s.theme)
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<BuyToken />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Layout>
  )
}
