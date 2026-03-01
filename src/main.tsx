import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

const cur = document.createElement("div")
cur.id = "opwa-cursor"
document.body.appendChild(cur)

document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px"
  cur.style.top = e.clientY + "px"
})
document.addEventListener("mouseover", (e) => {
  const t = e.target as HTMLElement
  cur.classList.toggle("hovering", !!t.closest("a,button,input,select,[role=button]"))
})

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
)