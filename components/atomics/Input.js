export default function Input({ value, onChange, placeholder, css, type }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type ?? "text"}
      placeholder={placeholder}
      className={`${css} w-full border-2 sm:border-4 outline-none focus:outline-none focus:border-blue-500 active:outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl text-xs sm:text-base md:text-xl`}
    />
  );
}
