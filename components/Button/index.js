import { colors } from "../../styles/theme"

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
        }
        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }
        button > :global(svg) {
          margin-right: 16px;
        }
        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
