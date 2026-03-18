import { NavLink, Outlet } from "react-router";
import styles from "./Layout.module.css";
import PlayIcon from "../../assets/icons/play.svg";
import SearchIcon from "../../assets/icons/search.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import DatingIcon from "../../assets/icons/like.svg";
import InfoIcon from "../../assets/icons/info.svg";

const navItems = [
  {
    icon: PlayIcon,
    to: "/play",
  },
  {
    icon: SearchIcon,
    to: "/search",
  },
  {
    icon: CalendarIcon,
    to: "/schedule",
  },
  {
    icon: DatingIcon,
    to: "/dating",
  },
  {
    icon: InfoIcon,
    to: "/info",
  },
];

const Layout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Outlet />
      </main>

      <nav className={styles.navbar}>
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
            key={item.to}
          >
            <item.icon className={styles.navIcon} />
            {/* <item.icon className={styles.navIcon} /> */}
            {/* <span className={styles.navIcon}>
              <img src={item.icon} />
            </span> */}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
