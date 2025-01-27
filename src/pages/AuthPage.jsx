import { useState } from "react";

import SendOtpForm from "../components/templates/SendOtpForm";
import CheckOtpForm from "../components/templates/CheckOtpForm";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [code, setCode] = useState("");

  return (
    <>
      {step === 1 && (
        <SendOtpForm
          setStep={setStep}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
        />
      )}
      {step === 2 && (
        <CheckOtpForm
          setStep={setStep}
          mobileNumber={mobileNumber}
          code={code}
          setCode={setCode}
        />
      )}
    </>
  );
};

export default AuthPage;
