export function useToast() {
  function dispatch(type: 'success' | 'error' | 'info', title: string, desc: string) {
    window.dispatchEvent(new CustomEvent('opwa:toast', { detail: { type, title, desc, id: Date.now() } }))
  }
  return {
    success: (title: string, desc = '') => dispatch('success', title, desc),
    error:   (title: string, desc = '') => dispatch('error', title, desc),
    info:    (title: string, desc = '') => dispatch('info', title, desc),
  }
}