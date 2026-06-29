/* 查看简历入口：新标签页打开 public 里的 PDF；Hero 与 Projects 共用 */
export default function ResumeLink({ className = "" }) {
  return (
    <a
      href={encodeURI("/马超越昊-前端全栈简历.pdf")}
      target="_blank"
      rel="noopener noreferrer"
      className={`hero-resume-btn group inline-flex items-center gap-2.5 w-fit text-sm md:text-base font-semibold transition-all duration-300 ${className}`}
      style={{ color: "rgba(255, 210, 0, 0.9)" }}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
      查看简历
      <span className="font-normal text-gray-400">View Resume</span>
    </a>
  )
}
