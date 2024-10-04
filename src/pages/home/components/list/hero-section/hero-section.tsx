import style from "./hero-section.module.css";

const HeroSection: React.FC = () => {
  return (
    <section  className={style.aboutUs}>
            <div className={style.aboutUsCenter}>
                <h1>Go Wonder Trip</h1>
                <p>Travelling tends to magnify all human emotions.</p>
                <button>Choose your trip</button>
            </div>
      </section>
  );
};
export default HeroSection;
