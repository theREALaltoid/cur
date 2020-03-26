import React from "react";
import Routes from "../routes/routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PageFooter from "../components/footer";

const App = props => {
  return (
    <div className={!props.dark ? "App" : "night"}>
      <Routes />
      <PageFooter />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    dark: state.dark
  };
};
export default withRouter(connect(mapStateToProps)(App));
