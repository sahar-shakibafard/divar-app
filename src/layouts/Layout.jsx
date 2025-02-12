import Header from "./Header";
import Footer from "./Footer";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section className={styles.main}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
