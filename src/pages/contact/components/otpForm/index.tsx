import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import React from "react";

interface OtpFormProps {
  numInputs?: number;
}

const OtpForm: React.FC<OtpFormProps> = ({ numInputs = 4 }): JSX.Element => {
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
    <div
      style={{
        margin: 50,
        display: "flex",
        gap: 8,
        width: 200,
        height: 50,
      }}
    >
      {otp.map((value, index) => (
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
      ))}
    </div>
  );
};
export default OtpForm;
