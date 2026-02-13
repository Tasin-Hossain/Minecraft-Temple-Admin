import { MdMenu } from "react-icons/md";
import {  ButtonPrimary, IconButton } from "../../Components/Buttons";
import { PiBellDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
const AdminHeader = ({sidebarExpanded,setSidebarExpanded,expended}) => {
  return (
    <header className=" bg-(--background) border-b border-(--border) px-6 py-4 flex items-center justify-between">
     <div className="">
       <ButtonPrimary
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="py-2! px-2!"
          title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <MdMenu size={24} className="text-(--text)" />
      </ButtonPrimary>
     </div>

      <div className="flex items-center gap-2">
        <IconButton className="">
          <AiTwotoneMail size={20}/>
        </IconButton>

        <IconButton className="">
          <PiBellDuotone size={20}/>
        </IconButton>

          <IconButton className="">
          <IoSettingsOutline size={20 }/>
        </IconButton>

      </div>

    </header>
  );
};

export default AdminHeader;