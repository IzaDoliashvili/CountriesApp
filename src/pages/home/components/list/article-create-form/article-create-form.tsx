import React, { ChangeEvent, useState } from "react";

interface ArticleCreateFormProps {
  errorMsg: string;
  onArticleCreate: (articleFields: {
    titleEn: string;
    descriptionEn: string;
    titleKa: string;
    descriptionKa: string;
    imageSrc: string;
  }) => void;
}

const ArticleCreateForm: React.FC<ArticleCreateFormProps> = ({
  errorMsg,
  onArticleCreate,
}) => {
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [titleKa, setTitleKa] = useState("");
  const [descriptionKa, setDescriptionKa] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fieldErrorMsg, setFieldErrorMsg] = useState(errorMsg);

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
      setFieldErrorMsg("");
    }
  };

  const convertFileToBase64 = (
    file: File,
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onArticleCreate({
      titleEn,
      descriptionEn,
      titleKa,
      descriptionKa,
      imageSrc: imageSrc ?? "https://via.placeholder.com/300",
    });
    setTitleEn("");
    setDescriptionEn("");
    setTitleKa("");
    setDescriptionKa("");
    setImageSrc(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 15,
      }}
    >
      <div>
        <label>English Title:</label>
        <input
          type="text"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>
      <div>
        <label>English Description:</label>
        <input
          type="text"
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
        />
      </div>
      <div>
        <label>Georgian Title:</label>
        <input
          type="text"
          value={titleKa}
          onChange={(e) => setTitleKa(e.target.value)}
        />
      </div>
      <div>
        <label>Georgian Description:</label>
        <input
          type="text"
          value={descriptionKa}
          onChange={(e) => setDescriptionKa(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept=".jpg, .png"
          onChange={handleFileChange}
          required
        />

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Preview"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        )}
      </div>
      <span style={{ color: "red" }}>{fieldErrorMsg}</span>
      <button
        type="submit"
        style={{ marginLeft: 0, width: 100, margin: "auto" }}
      >
        Create
      </button>
    </form>
  );
};

export default ArticleCreateForm;
