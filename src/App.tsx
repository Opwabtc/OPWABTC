import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import { useAppStore } from "./store/useAppStore"
import { useLivePrices } from "./hooks/useLivePrices"

function Inner() {
  useLivePrices()
  const theme = useAppStore((s) => s.theme)
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme) }, [theme])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  )
}