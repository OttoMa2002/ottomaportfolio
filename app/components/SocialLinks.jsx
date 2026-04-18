"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"

/* 联系方式：邮件 / 微信 / 电话 */
const CONTACT_INFO = {
  email:   "chaoyuehaoma@gmail.com",
  wechat:  "chaoyuehaoma",
  phone:   "+86 18652860008 +1 7657122198",
}

/* 社交图标配置：link 类型直接外链，modal 类型点击弹窗显示联系方式 */
const SOCIAL_ITEMS = [
  {
    id: "instagram",
    label: "Instagram",
    type: "link",
    href: "https://www.instagram.com/reiko_jax_/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
        <g fill="none">
          <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
          <path fill="currentColor" d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8Zm-4 5a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm4.5-3.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z"/>
        </g>
      </svg>
    ),
  },
  {
    id: "bilibili",
    label: "Bilibili",
    type: "link",
    href: "https://space.bilibili.com/22360701?spm_id_from=333.1007.0.0",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5 3.5h-2.38l.94-.94a1.49 1.49 0 0 0 0-2.12a1.51 1.51 0 0 0-2.12 0L12.88 3.5h-1.76L8.06.44a1.51 1.51 0 0 0-2.12 0a1.49 1.49 0 0 0 0 2.12l.94.94H4.5A4.51 4.51 0 0 0 0 8v10a4.51 4.51 0 0 0 4.5 4.5H5a1.75 1.75 0 0 0 3.46 0h7a1.75 1.75 0 0 0 3.46 0h.52A4.51 4.51 0 0 0 24 18V8a4.51 4.51 0 0 0-4.5-4.5M21 18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V8a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 8Z"/>
        <path d="M15 15.1a.73.73 0 0 0-.87.57a.54.54 0 0 1-.34.08c-.65 0-1-1-1-1a.76.76 0 0 0-.71-.49a.76.76 0 0 0-.7.49s-.4 1-1.05 1c-.23 0-.32-.06-.32 0a.75.75 0 0 0-1.55.25a1.69 1.69 0 0 0 1.79 1.24a2.35 2.35 0 0 0 1.75-.82a2.35 2.35 0 0 0 1.75.83A1.69 1.69 0 0 0 15.54 16a.77.77 0 0 0-.54-.9m-5.24-4.45a.74.74 0 0 0-.88-.58l-3.94.8a.75.75 0 0 0-.59.89a.77.77 0 0 0 .74.6h.15l3.94-.8a.76.76 0 0 0 .58-.91m9.3.22l-3.94-.8a.74.74 0 0 0-.88.58a.76.76 0 0 0 .58.89l3.94.8h.15a.77.77 0 0 0 .74-.6a.75.75 0 0 0-.59-.87"/>
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    type: "link",
    href: "https://github.com/OttoMa2002",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 416" fill="currentColor">
        <path d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"/>
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    type: "modal",
    modalTitle: "邮件地址 Email",
    modalContent: CONTACT_INFO.email,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 384" fill="currentColor">
        <path d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 86V64L213 171L43 64v43l170 106z"/>
      </svg>
    ),
  },
  {
    id: "wechat",
    label: "WeChat",
    type: "modal",
    modalTitle: "微信 Wechat",
    modalContent: CONTACT_INFO.wechat,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213c0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098a10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05c-.857-2.578.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c.942 2.453 3.666 4.229 6.884 4.229c.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247c0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156a.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone",
    type: "modal",
    modalTitle: "电话 Phone Number",
    modalContent: CONTACT_INFO.phone,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.2 10c-1.1-.1-1.7 1.4-2.5 1.8C8.4 12.5 6 10 6 10S3.5 7.6 4.1 6.3c.5-.8 2-1.4 1.9-2.5c-.1-1-2.3-4.6-3.4-3.6C.2 2.4 0 3.3 0 5.1c-.1 3.1 3.9 7 3.9 7c.4.4 3.9 4 7 3.9c1.8 0 2.7-.2 4.9-2.6c1-1.1-2.5-3.3-3.6-3.4z"/>
      </svg>
    ),
  },
]

/* Modal 关闭动画时长（ms），淡出用 */
const EXIT_DURATION = 160

/* 联系方式弹窗：入场 focus-in 淡入 + 缩放模糊，出场快速淡出，支持 Esc / 点遮罩关闭 */
function ContactModal({ item, onClose }) {
  const overlayRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  const startClose = useCallback(() => {
    setExiting(true)
    setTimeout(onClose, EXIT_DURATION)
  }, [onClose])

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") startClose() }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [startClose])

  const open = entered && !exiting

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        opacity: open ? 1 : 0,
        transition: exiting ? `opacity ${EXIT_DURATION}ms ease-in` : "opacity 180ms ease-out",
      }}
      onClick={(e) => { if (e.target === overlayRef.current) startClose() }}
    >
      <div
        className="relative rounded-2xl px-8 py-6 min-w-60 text-center"
        style={{
          background: "rgba(22, 22, 22, 0.98)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          fontFamily: "var(--font-quicksand)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
          filter: open ? "blur(0)" : "blur(5px)",
          transition: exiting
            ? `opacity ${EXIT_DURATION}ms ease-in, transform ${EXIT_DURATION}ms ease-in, filter ${EXIT_DURATION}ms ease-in`
            : "opacity 260ms ease-out, transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease-out",
          willChange: "opacity, transform, filter",
        }}
      >
        <p className="text-xs text-white/50 uppercase tracking-widest mb-2">
          {item.modalTitle}
        </p>
        <p className="text-gray-400 text-base font-medium select-all">
          {item.modalContent}
        </p>
      </div>
    </div>,
    document.body
  )
}

/* 社交图标组：link 渲染 <a> 外链，modal 渲染 <button> 触发联系方式弹窗 */
export default function SocialLinks({ iconSize = 20, gap = "gap-5" }) {
  const [activeModal, setActiveModal] = useState(null)
  const activeItem = SOCIAL_ITEMS.find((i) => i.id === activeModal)

  return (
    <>
      <div className={`flex ${gap} text-gray-300`}>
        {SOCIAL_ITEMS.map((item) =>
          item.type === "link" ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-200"
            >
              {item.icon}
            </a>
          ) : (
            <button
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              aria-label={item.label}
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-200 cursor-pointer"
            >
              {item.icon}
            </button>
          )
        )}
      </div>

      {activeItem && (
        <ContactModal item={activeItem} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}