import { useEffect, useState } from 'react'
interface Toast { id: number; type: string; title: string; desc: string }
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])
  useEffect(() => {
    const h = (e: Event) => {
      const { type, title, desc } = (e as CustomEvent).detail
      const id = Date.now()
      setToasts(t => [...t, { id, type, title, desc }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000)
    }
    window.addEventListener('opwa-toast', h)
    return () => window.removeEventListener('opwa-toast', h)
  }, [])
  const icons: Record<string,string> = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/>',
  }
  return (
    <div className="toast-area">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <svg className={`toast-icon ${t.type}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            dangerouslySetInnerHTML={{ __html: icons[t.type] || icons.info }} />
          <div className="toast-body">
            <div className="toast-title">{t.title}</div>
            <div className="toast-desc">{t.desc}</div>
          </div>
          <button className="toast-close" onClick={() => setToasts(x => x.filter(i => i.id !== t.id))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
