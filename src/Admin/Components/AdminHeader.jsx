import { MdMenu } from "react-icons/md";
import { ButtonPrimary, IconButton } from "../../Components/Buttons";
import { PiBellDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
const AdminHeader = ({ sidebarExpanded, setSidebarExpanded,setSettingsOpen }) => {
  return (
    <header className=" bg-(--sidebar) border-b border-(--border) px-6 py-4 flex items-center justify-between">
      <div className="">
        <ButtonPrimary
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="py-2! px-2!"
          title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <MdMenu size={24} className="text-(--text)" />
        </ButtonPrimary>
      </div>

      <div className="flex items-center gap-2 ">
        <IconButton className="group">
          <IoMailOutline size={20} className="group-hover:animate-[mailPop_1s_ease-in-out]"/>
        </IconButton>

        <IconButton className="group">
          <PiBellDuotone
            size={20}
            className="origin-top group-hover:animate-[ring_1s_ease-in-out]"
          />
        </IconButton>
        {/* Setting */}
        <IconButton className="group "  onClick={() => setSettingsOpen((prev) => !prev)} >
          
          <IoSettingsOutline
            size={20}
            className="group-hover:rotate-180 transition duration-500"
          />
        </IconButton>
      </div>
    </header>
  );
};

export default AdminHeader;
