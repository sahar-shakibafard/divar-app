import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./CheckOtpForm.module.css";

import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookies";
import { getProfile } from "services/user";

const CheckOtpForm = ({ setStep, mobileNumber, code, setCode }) => {
  const navigate = useNavigate();
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const validateCode = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setCode(value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobileNumber, code);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>کد ارسال شده به شماره موبایل ({mobileNumber}) را وارد کنید.</span>
        <label htmlFor="input">کد تایید را وارد کنید</label>
        <input
          type="text"
          id="input"
          placeholder="کد تایید"
          value={code}
          onChange={validateCode}
        />
        <button type="submit">ارسال</button>
        <button onClick={() => setStep(1)} className={styles.backButton}>
          تغییر شماره موبایل
        </button>
      </form>
    </>
  );
};

export default CheckOtpForm;
