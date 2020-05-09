import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Todos />
      </>
    );
  }
}
