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
export function ButtonGreen({
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
  variant = "primary",
  size = "md",
}) {
  const variantStyles = {
    primary: "bg-(--theme) hover:brightness-110 text-white border-(--theme)",
    outline:
      "bg-(--hover) border border-(--border) text-(--muted-text) hover:bg-transprate hover:text-(--text-wh)",
    ghost: "bg-transparent hover:bg-(--hover) text-(--muted-text) border-none",
    danger: "bg-red-600 hover:brightness-110 text-white border-red-600",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs min-w-[2.25rem]",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center tracking-normal justify-center gap-2 rounded-md font-medium transition-all
       
        disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer 
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `
        .replace(/\s+/g, " ")
        .trim()}
    >
      {icon && <span className="text-[1.125rem]">{icon}</span>}
      {children}
    </button>
  );
}

export function DiscordButton({
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
        cursor-pointer tracking-normal text-zinc-200  flex gap-2 items-center bg-[#5865F2] px-4 py-2 rounded-lg  text-[14px] hover:bg-[#3b4aed] transition-all ease-in duration-200
        ${className}
      `}
    >
      {icon && <span className="text-[20px]">{icon}</span>}
      {children}
    </button>
  );
}

export function GoogleButton({
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
        cursor-pointer text-[14px] text-[#413f3f] hover:bg-[#afaea7] border border-(--border) flex gap-2 items-center bg-[#d9d8d0] px-4 py-2 rounded-lg font-medium  transition-all ease-in duration-200
        ${className}
      `}
    >
      {icon && <span className="text-[20px]">{icon}</span>}
      {children}
    </button>
  );
}
