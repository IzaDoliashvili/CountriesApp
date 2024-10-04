import  { FC} from "react";
import style from "./header.module.css";
import { Link, NavLink, NavLinkRenderProps } from "react-router-dom";

export const Header: FC = () => {
  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    if (isActive) {
      return style["active_nav_item"];
    } else {
      return style["nav_item"];
    }
  };
  return (
    <header>
      <div className={style.centerDiv}>
    <Link className={style["logo"]} to="/">
        <span>Wounder trip</span>
    </Link>
    <div className={style.navMenu}>
         <NavLink className={handleActiveNav} to="/home">Home</NavLink>
         <NavLink to="/about" className={handleActiveNav}>About us</NavLink>
         <NavLink to="" className={handleActiveNav}>Services</NavLink>
         <NavLink to="/contact"className={handleActiveNav}>Contact</NavLink>
    </div>

    </div>
    </header>
  );
};
