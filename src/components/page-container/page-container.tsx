import classes from "./page-container.module.css";

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <main className={classes.root}>{children}</main>;
};
