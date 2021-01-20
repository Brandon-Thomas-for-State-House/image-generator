import React, { Component } from "react";
import { Stage } from "react-konva";
import styles from "./DownloadButton.module.css";
import ReactGA from "react-ga";

type Props = {
  stageRef: typeof Stage,
  name: string,
  trackData: any
};
export default class DownloadButton extends Component<Props> {
  getDataUrl = () => {
    return this.props.stageRef.getStage().toDataURL({ pixelRatio: 3 });
  };

  handleDownload = () => {
    const dataUrl = this.getDataUrl();
    const fileName = `${this.props.name
      .toLowerCase()
      .trim()
      .replace(" ", "_")}_endorses_brandon.png`;
    this.goToUri(dataUrl, { fileName });
    this.trackDownload();
  };

  goToUri(uri: string, config: { fileName?: string, _blank?: boolean }) {
    const link = window.document.createElement("a");
    if (config.fileName) link.download = config.fileName;
    if (config._blank) link._blank = config._blank;
    link.href = uri;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }

  trackDownload = () => {
    const isGAEnabled = process.env.NODE_ENV === "production";
    const { trackingData } = this.props;

    if (isGAEnabled) {
      ReactGA.event({
        category: "Download",
        action: "Download PNG",
        label: JSON.stringify(trackingData)
      });
    }
  };

  render() {
    return (
      <div>
        <button
          name="download"
          className={styles.button}
          onClick={this.handleDownload}
        >
          Download
        </button>
        <div className={styles.disclaimer}>(when you are finished)</div>
      </div>
    );
  }
}
