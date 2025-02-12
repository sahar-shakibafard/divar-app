import styles from "./SendOtpForm.module.css";

import { sendOtp } from "../../services/auth";

const SendOtpForm = ({ setStep, mobileNumber, setMobileNumber }) => {
  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobileNumber.length !== 11) return;
    const { response, error } = await sendOtp(mobileNumber);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };

  const validateNumber = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setMobileNumber(value);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>
          برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
          تایید به این شماره ارسال خواهد شد.
        </span>
        <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
        <input
          type="text"
          id="input"
          placeholder="شماره موبایل"
          value={mobileNumber}
          onChange={validateNumber}
        />
        <button type="submit">ارسال</button>
      </form>
    </>
  );
};

export default SendOtpForm;
