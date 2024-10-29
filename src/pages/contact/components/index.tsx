import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import React from "react";
import style from "./contact.module.css";
import { useParams } from "react-router-dom";

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

const ContactForm = ({ numInputs = 4 }) => {
  const { lang } = useParams();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      message: "",
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
    if (formData.message === "") {
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

  // add inputs

  const [otp, setOtp] = useState(Array(numInputs).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < numInputs - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKey = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastData = e.clipboardData
      .getData("text")
      .slice(0, numInputs)
      .split("");
    const newOtp = [...otp];

    pastData.forEach((char, i) => {
      if (char.match(/^\d$/)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);

    const lastIndex = pastData.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
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

      <div
        style={{
          marginTop: 100,
          display: "flex",
          gap: 8,
          width: 200,
          height: 50,
        }}
      >
        {otp.map((value, index) => {
          return (
            <input
              ref={(el) => (inputRefs.current[index] = el!)}
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKey(e, index)}
              onPaste={handleOtpPaste}
              style={{ width: 60, textAlign: "center" }}
              maxLength={1}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ContactForm;
