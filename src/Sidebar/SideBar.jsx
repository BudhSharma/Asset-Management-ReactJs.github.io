import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CategoryIcon from "@mui/icons-material/Category";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactsIcon from "@mui/icons-material/Contacts";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const routes = [
  {
    path: "/dash",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/register",
    name: "Users",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/register",
        name: "Add User",
        icon: <PersonAddIcon />,
      },
      {
        path: "/user-list",
        name: "User List",
        icon: <ContactsIcon />,
      },
    ],
  },
  {
    path: "/employee",
    name: "Employee",
    icon: <GroupAddIcon />,
  },
  {
    path: "/category",
    name: "Asset Category",
    icon: <FaUser />,
  },
  {
    path: "/department",
    name: "Department",
    icon: <LocalFireDepartmentIcon />,
  },
  {
    path: "/company",
    name: "Company Details",
    icon: <EmojiTransportationIcon />,
  },
  {
    path: "/add-asset",
    name: "Add an Asset",
    icon: <CategoryIcon />,
    subRoutes: [
      {
        path: "/add-asset",
        name: "Add an Asset",
        icon: <AddCircleOutlineIcon />,
      },
      {
        path: "/list-asset",
        name: "List of Assets",
        icon: <FormatListBulletedIcon />,
      },
      {
        path: "/disposed-asset",
        name: "Disposed Assets List",
        icon: <AutoDeleteIcon />,
      },
    ],
  },
  {
    path: "/feed",
    name: "Feed",
    icon: <ErrorOutlineIcon />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div
        className="main-container"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <motion.div
          animate={{
            width: isOpen ? "280px" : "75px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
          style={{ overflow: "hidden" }}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                ></motion.h1>
              )}
            </AnimatePresence>

            <div className="bars" style={{ cursor: "pointer" }}>
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
