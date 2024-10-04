import style from "./about.module.css";

const AboutDescription = () => {
    return (
      <section  className={style.aboutUs}>
              <div className={style.aboutUsCenter}>
                <div>
                  <img src="https://storage.georgia.travel/images/tbilisi-capital-of-georgia(1).webp" alt="" />
                </div>
                <div>
                  <h1>Go Wonder Trip</h1>
                  <p>Travelling tends to magnify all human emotions.</p>
                  
                </div> 
              </div>
        </section>
    );
  };
  
  export default AboutDescription;
  