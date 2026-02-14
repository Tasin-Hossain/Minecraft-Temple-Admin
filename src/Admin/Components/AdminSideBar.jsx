import React, { memo, useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { SimpleTooltip } from "./Tooltip/SimpleTooltip";
import { MenuTooltip } from "./Tooltip/MenuTooltip";

/* ================= MENU CONFIG ================= */
const menu = [
  {
    name: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/admin",
  },
  {
    name: "Themes",
    icon: FiMoon,
    children: [
      { name: "Components", path: "/admin/components" },
      { name: "Admin Theme", path: "/admin/admin-theme-change" },
      { name: "Global Theme", path: "/admin/global-theme-change" },
    ],
  },
  {
    name: "Orders",
    icon: FiMoon,
    children: [
      { name: "All Orders", path: "/admin/orders" },
      { name: "Pending", path: "/admin/orders/pending" },
      { name: "Completed", path: "/admin/orders/completed" },
    ],
  },
  {
    name: "Products",
    icon: MdOutlineDashboard,
    path: "/admin/products",
  },
];

/* ================= SIDEBAR ================= */
export default function SideBar({ expanded }) {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  /* auto open parent menu if child route active */
  useEffect(() => {
    const opened = {};
    menu.forEach((item) => {
      if (
        item.children && item.children.some((c) => pathname.startsWith(c.path))
      ) {
        opened[item.name] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...opened }));
  }, [pathname]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className=" bg-(--background) border-r border-(--border) h-screen flex flex-col overflow-hidden">
      {/* LOGO */}
      <div className="px-6 py-4 flex items-center gap-4 ">
        <Link to="/admin">
          <div className="w-10 h-11 flex items-center justify-center">
            <img
              src={Logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <span className="text-[16px] font-semibold text-(--theme)">
            Minecraft
            <span className="text-(--text)"> Temple</span>
          </span>
        </div>
      </div>

      {/* SCROLLABLE MENU */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 flex flex-col gap-2 sidebar-scroll">
        {menu.map((item, i) => (
          <MenuItem
            key={i}
            item={item}
            expanded={expanded}
            pathname={pathname}
            isOpen={openMenus[item.name]}
            toggle={toggleMenu}
          />
        ))}
      </nav>

      {/* Profile */}
      <div className="px-6 py-4 flex items-center gap-4 border-t border-(--border)">
        s
      </div>
    </aside>
  );
}

/* ================= MENU ITEM ================= */
const MenuItem = memo(({ item, expanded, pathname, isOpen, toggle }) => {
  const { name, icon: Icon, path, children } = item;

  const isActive =
    path === pathname ||
    (children && children.some((c) => pathname.startsWith(c.path)));

  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoverTooltip, setHoverTooltip] = useState(false);

  const showTooltip = (e) => {
    if (expanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
  };

  const hideTooltip = () => {
    if (!hoverTooltip) setTooltipPos(null);
  };

  return (
    <>
      <div
        className="relative custom-scrollbar"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {/* MAIN ITEM */}
        <Link
          to={path || "#"}
          onClick={() => children && toggle(name)}
          className={`
            group relative w-full flex items-center justify-between
            px-4 py-3 rounded-sm transition-all duration-200 f
            ${
              isActive
                ? "text-(--text) bg-(--primary) shadow-[inset_0_4px_0px_#ffd953,inset_0_-5px_0px_#ff791a]"
                : "text-(--text) hover:bg-(--sidebar-hover) font-semibold"
            }
          `}
        >
          <div className="flex items-center gap-2">
            <Icon size={20} />
            {expanded && (
              <span className="text-[14px] font-medium whitespace-nowrap">
                {name}
              </span>
            )}
          </div>

          {children && expanded && (
            <span
              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
            >
              <MdOutlineKeyboardArrowRight size={18} />
            </span>
          )}
        </Link>

        {/* SUB MENU (Expanded Mode) */}
        {children && expanded && isOpen && (
          <div className=" mt-2 flex flex-col gap-2 pl-4 transition">
            <div>
            </div>
            {children.map((child) => {
              const childActive = pathname === child.path;
              return (
                <div className="flex items-center gap-2 ">
                  <div className={`${childActive ? "bg-(--primary)":"bg-(--text)"} w-1 h-1 rounded-full`}>
                    {""}
                  </div>
                  <Link
                  key={child.name}
                  to={child.path}
                  className={`
                    text-[14px] px-4 w-full py-3 rounded-md transition 
                    ${
                      childActive
                        ? "text-(--primary) bg-(--sidebar-hover)"
                        : "text-(--text) hover:bg-(--sidebar-hover)"
                    }
                  `}
                >
                  {child.name}
                </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* TOOLTIP (Collapsed Mode) */}
      {!expanded &&
        tooltipPos &&
        (children ? (
          <MenuTooltip
            position={{
              top: tooltipPos.top - 20,
              left: tooltipPos.left + -7,
            }}
            onMouseEnter={() => setHoverTooltip(true)}
            onMouseLeave={() => {
              setHoverTooltip(false);
              setTooltipPos(null);
            }}
          >
            {children.map((child) => {
              const childActive =
                pathname === child.path ||
                pathname.startsWith(child.path + "/");

              return (
                <Link
                  key={child.name}
                  to={child.path}
                  className={` block text-[12px] px-2 py-2 rounded transition
                        ${childActive ? "bg-(--primary) text-(--muted-text) font-bold" : "hover:bg-(--tooltip-hover)"}`}>
                  {child.name}
                </Link>
              );
            })}
          </MenuTooltip>
        ) : (
          <SimpleTooltip
            text={name}
            position={{
              top: tooltipPos.top,
              left: tooltipPos.left,
            }}
            onMouseEnter={() => setHoverTooltip(true)}
            onMouseLeave={() => {
              setHoverTooltip(false);
              setTooltipPos(null);
            }}
          />
        ))}
    </>
  );
});
