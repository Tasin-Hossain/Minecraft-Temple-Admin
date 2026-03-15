import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/logo.png";

const Breadcrumbs = () => {
  let breadcrumbPath = ""; // <-- const না, let হবে
  const location = useLocation();
  const pathName = location.pathname.split("/").filter((x) => x);

  return (
    <div className="py-4 px-6 mb-4 bg-(--card) rounded-md flex gap-2">
      <Link to="/admin">
        <div className="w-7">
          <img src={Logo} alt="" className="w-full"/>
        </div>
      </Link>

      {pathName.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathName.length - 1;

        return isLast ? (
          <span
            key={breadcrumbPath}
            className="  hover:cursor-not-allowed"
          >
            {" "}
            <span className="">/</span> {name}
          </span>
        ) : (
          <Link
            key={breadcrumbPath}
            to={breadcrumbPath}
            className="text-(--theme) hover:brightness-110"
          >
            / {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;