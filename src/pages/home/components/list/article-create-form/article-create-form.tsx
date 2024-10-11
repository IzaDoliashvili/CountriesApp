import { FormEvent } from "react";

type ArticleCreateFormProps = {
  onArticleCreate: (e: FormEvent<HTMLFormElement>) => void;
};

const ArticleCreateForm: React.FC<ArticleCreateFormProps> = ({
  onArticleCreate,
}) => {
  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
      onSubmit={onArticleCreate}
    >
      <input name="title" />
      <input name="description" />

      <button type="submit">Create Article</button>
    </form>
  );
};

export default ArticleCreateForm;
