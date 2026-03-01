import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Navigation } from './Navigation'
import { GasConverterWidget } from './GasConverterWidget'
import { ToastContainer } from './ToastContainer'

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useAppStore(s => s.theme)
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: 'var(--navbar-h)' }}>{children}</div>
      <GasConverterWidget />
      <ToastContainer />
    </>
  )
}
