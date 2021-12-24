export default function Tag({
  value,
  onClick,
  css,
  disabled,
  isLeft,
  children,
}) {
  return (
    <button
      value={value}
      onClick={onClick}
      className={`${css} ${
        disabled ? "bg-gray-300" : ""
      } p-2 sm:p-4 rounded-lg font-semibold sm:rounded-xl text-xs sm:text-base md:text-lg ${
        isLeft ? "text-left" : "text-center"
      } outline-none`}
    >
      {children}
    </button>
  );
}
