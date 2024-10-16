import { ChangeEvent, FormEvent, useState  } from "react";

type ArticleCreateFormProps = {
  onArticleCreate: (articleFields: {
    title: string;
    description: string;
  }) => void;
  errorMsg: string;
};

const ArticleCreateForm: React.FC<ArticleCreateFormProps> = ({
  onArticleCreate,
}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (title.length > 8) {
      setFieldErrorMsg("Title არ უნდა შეიცავდეს 8-ზე მეტ სიმბოლოს !");
      return;
    }

    setTitle(value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onArticleCreate({ title, description });
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
      onSubmit={handleSubmit}
    >
      <input value={title} onChange={handleChangeTitle} name="title" />
      <span style={{ color: "red" }}>{fieldErrorMsg}</span>
      <input
        value={description}
        onChange={handleChangeDescription}
        name="description"
      />

      <button type="submit">Create Article</button>
      
    
    </form>
  );
};

export default ArticleCreateForm;


