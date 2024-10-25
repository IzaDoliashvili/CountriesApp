import { FC } from "react";
import style from "./header.module.css";
import { Link, NavLink, NavLinkRenderProps, useParams } from "react-router-dom";
import LanguageSwitcher from "@/languages/language";

const translations = {
  en: {
    logo: "Wounder trip",
    home: "Home",
    about: "About us",
    services: "Services",
    contact: "Contact",
  },
  ka: {
    logo: "საოცნებო მოგზაურობა",
    home: "მთავარი",
    about: "ჩვენ შესახებ",
    services: "სერვისები",
    contact: "კონტაქტი",
  },
};

export const Header: FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = translations[lang] || translations.en;
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
          <span>{currentLang.logo}</span>
        </Link>
        <div className={style.navMenu}>
          <NavLink className={handleActiveNav} to="home">
            {currentLang.home}
          </NavLink>
          <NavLink to="about" className={handleActiveNav}>
            {currentLang.about}
          </NavLink>
          <NavLink to="" className={handleActiveNav}>
            {currentLang.services}
          </NavLink>
          <NavLink to="contact" className={handleActiveNav}>
            {currentLang.contact}
          </NavLink>
        </div>
        <div className={style.languageSwitcher}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
