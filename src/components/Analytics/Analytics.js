// @flow
import { Component } from "react";
import ReactGA from "react-ga";

type Props = {
  location: {
    pathname: string,
    search: string
  },
  options: any
};

export default class GoogleAnalytics extends Component<Props> {
  componentDidMount() {
    const isGAEnabled = process.env.NODE_ENV === "production";

    if (isGAEnabled) {
      ReactGA.initialize("UA-178512622-2");
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  render() {
    return null;
  }
}
