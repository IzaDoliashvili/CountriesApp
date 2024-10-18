import { useState, useEffect } from "react";
import React from "react";
import style from "./contact.module.css";
import { useParams } from 'react-router-dom';

const translations = {
  en: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Message",
    submit: "Submit",
  },
  ka: {
    firstName: "სახელი",
    lastName: "გვარი",
    email: "ელფოსტა",
    message: "მესიჯი",
    submit: "გაგზავნა",
  },
};


const ContactForm = () => {
  const { lang} = useParams(); 
  const currentLang = translations[lang] || translations.en;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  

  useEffect(() => {
    const savedFormData = localStorage.getItem("contactFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      message:"",
    };
    let isValid = true;
    //FirstName
    if (!/[A-Z]/.test(formData.firstName)) {
      newErrors.firstName = "გთხოვთ ჩაწერეთ მაღალი სიმბოლო";
      isValid = false;
    }
    //LastName
    if (!/[A-Z]/.test(formData.lastName)) {
      newErrors.lastName = "გთხოვთ ჩაწერეთ მაღალი სიმბოლო";
      isValid = false;
    }

    // Email 
    if (!/@/.test(formData.email)) {
      newErrors.email = "გთხოვთ ჩაწერეთ @ სიმბოლო";
      isValid = false;
    }
     // Message
    if(formData.message === "") {
      newErrors.message = "გთხოვთ შეავსოთ ველი";
      isValid = false;
    
    }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      alert("Form data saved!");
    }
  };
  

  return (
    <section className={style.centerform}>
      <form onSubmit={handleSubmit} className={style.contactForm}>
        <label>
        {currentLang.firstName}:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.firstName}</p>
        </label>
        <label>
        {currentLang.lastName}:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.lastName}</p>
          
        </label>
        <label>
        {currentLang.email}:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </label>
        <label>
        {currentLang.message}:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.message}</p>
        </label>
        <button type="submit">{currentLang.submit}</button>
      </form>
    </section>
  );
};

export default ContactForm;

