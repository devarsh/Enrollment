import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import ContentSection from "./pages";

const Index = () => {
  return (
    <Fragment>
      <Header />
      <ContentSection />
      <Footer />
    </Fragment>
  );
};

export default Index;
