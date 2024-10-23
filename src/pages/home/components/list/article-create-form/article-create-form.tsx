// import { ChangeEvent, FormEvent, useState  } from "react";

// type ArticleCreateFormProps = {
//   onArticleCreate: (articleFields: {
//     title: string;
//     description: string;
//   }) => void;
//   errorMsg: string;
// };

// const ArticleCreateForm: React.FC<ArticleCreateFormProps> = ({
//   onArticleCreate,
// }) => {

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [fieldErrorMsg, setFieldErrorMsg] = useState("");

//   const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (title.length > 8) {
//       setFieldErrorMsg("Title არ უნდა შეიცავდეს 8-ზე მეტ სიმბოლოს !");
//       return;
//     }

//     setTitle(value);
//   };

//   const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setDescription(value);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onArticleCreate({ title, description });
//   };

//   return (
//     <form
//       style={{ display: "flex", flexDirection: "column", gap: 12 }}
//       onSubmit={handleSubmit}
//     >
//       <input value={title} onChange={handleChangeTitle} name="title" />
//       <span style={{ color: "red" }}>{fieldErrorMsg}</span>
//       <input
//         value={description}
//         onChange={handleChangeDescription}
//         name="description"
//       />

//       <button type="submit">Create Article</button>
      
    
//     </form>
//   );
// };

// export default ArticleCreateForm;

import { ChangeEvent, FormEvent, useState } from "react";

type ArticleCreateFormProps = {
  onArticleCreate: (articleFields: {
    title: string;
    description: string;
    imageSrc: string; 
  }) => void;
  errorMsg: string;
};

const ArticleCreateForm: React.FC<ArticleCreateFormProps> = ({
  onArticleCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrorMsg, setFieldErrorMsg] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 8) {
      setFieldErrorMsg("Title არ უნდა შეიცავდეს 8-ზე მეტ სიმბოლოს !");
      return; 
    }
    setTitle(value);
  };
  

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        setFieldErrorMsg("Please upload a valid .jpg or .png file.");
        return;
      }

      const base64 = await convertFileToBase64(file);
      setImageSrc(base64 as string); 
    }
  };

  const convertFileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !imageSrc) {
      setFieldErrorMsg("Please provide all fields.");
      return;
    }
    onArticleCreate({ title, description, imageSrc });
    
    
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        onChange={handleChangeTitle}
        name="title"
        placeholder="Title"
      />
      
      <input
        value={description}
        onChange={handleChangeDescription}
        name="description"
        placeholder="Description"
      />
      
      <input
        type="file"
        accept=".jpg, .png" 
        onChange={handleFileChange}
      />
      <span style={{ color: "red" }}>{fieldErrorMsg}</span>
      <button type="submit">Create Article</button>
    </form>
  );
};

export default ArticleCreateForm;

