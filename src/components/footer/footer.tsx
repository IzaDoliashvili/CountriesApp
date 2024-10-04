import classes from "./footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={classes.root}>
      © {new Date().getFullYear()} Wounder trip. All Rights Reserved
    </footer>
  );
};
