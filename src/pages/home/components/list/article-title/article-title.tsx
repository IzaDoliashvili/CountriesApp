import { AiOutlineLike } from "react-icons/ai";
import  style from "./article-title.module.css";


const ArticleTitle: React.FC<
  React.PropsWithChildren<{ voteCount: number; onUpVote: () => void }>
> = (props) => {
  const { children, voteCount, onUpVote } = props;

  return (
    <div className={style.articleTitleFlex}>
      {children}  
      <span style={
        { color: "#f0b965", cursor: "pointer", fontSize: 26, }
        }
        onClick={onUpVote}>
        <AiOutlineLike />

      </span>
      {voteCount}{" "}
    </div>
  );
};

export default ArticleTitle;