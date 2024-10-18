import { useNavigate } from "react-router-dom";
import style from "./language.module.css";

const LanguageSwitcher = () => {
  const navigate = useNavigate();

  const changeLanguage = (newLang: string) => {
    navigate(`/${newLang}/`);
  };

  return (
    <div className={style.language}>
      <button onClick={() => changeLanguage("en")}>En</button>
      <button onClick={() => changeLanguage("ka")}>Ka</button>
    </div>
  );
};

export default LanguageSwitcher;

