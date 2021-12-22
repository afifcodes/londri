export default function Tag({ value, onClick, css, children }) {
  return (
    <button
      value={value}
      onClick={onClick}
      className={`${css} p-2 sm:p-4 rounded-lg font-semibold sm:rounded-xl text-xs sm:text-base md:text-lg text-center`}
    >
      {children}
    </button>
  );
}
