import React from "react";
import Helmet from "react-helmet";

class HelmetComp extends React.Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta name="description" content="testing react helmet" />
        <meta name="keywords" content="react,seo,helmet" />
      </Helmet>
    );
  }
}

export default HelmetComp;
