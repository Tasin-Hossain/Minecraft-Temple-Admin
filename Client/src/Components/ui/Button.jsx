export function ButtonPrimary({
  children,
  icon = null,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 justify-center px-6 py-3 font-semibold bg-[#FFA41F]
        shadow-[inset_0_4px_0px_#ffd953,inset_0_-5px_0px_#ff791a] border-2 border-(--border) 
        hover:brightness-110 hover:shadow-[inset_0_5px_0px_#ffd953,inset_0_-5px_0px_#ff791a] 
        active:translate-y-0.5 active:shadow-[inset_0_5px_0px_#ffd953,inset_0_-1px_0px_#ff791a] 
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-sm

        ${className}
      `}
    >
      {icon && <span className="text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}
export  function ButtonGreen({
  children,
  icon = null,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  onChange,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onChange={onChange}
      className={`
         flex items-center gap-2 px-4 py-2 bg-green-500 cursor-pointer text-white rounded-md hover:brightness-90 transition text-sm font-medium

        ${className}
      `}
    >
      {icon && <span className="text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}

export function ButtonRed({
  children,
  icon = null,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 justify-center px-6 py-3 font-semibold text-white bg-linear-to-b from-[#fc3737] to-[#fc5858] shadow-[inset_0_4px_0px_#ee7373,inset_0_-5px_0px_#a22323] border border-(--border)
        hover:brightness-110 hover:shadow-[inset_0_4px_0px_#ee7373,inset_0_-5px_0px_#a22323]
        active:translate-y-0.5 active:shadow-[inset_0_4px_0px_#ee7373,inset_0_-1px_0px_#a22323]
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer rounded-sm

        ${className}
      `}
    >
      {icon && <span className="text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}

export function IconButton({
  children,
  icon = null,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center  gap-2 justify-center px-2 py-2 rounded-sm  border border-(--border) cursor-pointer hover:brightness-90  transition-all 
        ${className}
      `}
    >
      {icon && <span className="text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}

export default function Button({
  children,
  icon = null,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-4 py-2 bg-(--theme) cursor-pointer text-white rounded-md hover:brightness-90 transition text-sm font-medium
        ${className}
      `.replace(/\s+/g, " ").trim()}
    >
      {icon && (
        <span className="text-[18px]">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}