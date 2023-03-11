import React from "react";
import { Helmet } from "react-helmet";
import image from "./cart.jpg";
import Favicon from "./cart.jpg";

const SEO = ({ title }) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | Ush Stitches`}>
      <meta
        name="description"
        content="Ush stitches is an ecommerce website, where you can buy unisex clothing online"
      />
      <meta name="image" content={image} />
      <link rel="shortcut icon" href={Favicon} />
    </Helmet>
  );
};

export default SEO;
