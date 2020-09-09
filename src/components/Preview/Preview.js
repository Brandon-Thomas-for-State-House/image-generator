// @flow
import React from "react";
import style from "./Preview.module.css";
import { Stage, Layer, Text, Rect, Circle } from "react-konva";
import { UrlImage } from "../UrlImage/UrlImage.js";

type Props = {
  name: string,
  title: string,
  location: string,
  reason: string,
  profile: string
};

export default class Preview extends React.Component<Props> {
  stageRef: typeof Stage;

  handleDownload = () => {
    const dataUrl = this.stageRef.getStage().toDataURL();
    const fileName = `${this.props.name
      .toLowerCase()
      .trim()
      .replace(" ", "_")}_endorses_brandon.png`;
    this.downloadUri(dataUrl, fileName);
  };

  downloadUri(uri: string, name: string) {
    const link = window.document.createElement("a");
    link.download = name;
    link.href = uri;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }

  getTitleText = () => {
    const { title, location } = this.props;
    return !title.length
      ? location
      : !!location.length
      ? `${title}, ${location}`
      : title;
  };
  render() {
    const { name, reason, profile } = this.props;
    return (
      <div className={style.component}>
        <div className={style.title}>Preview</div>
        <Stage
          width={400}
          height={400}
          ref={node => {
            this.stageRef = node;
          }}
        >
          <Layer>
            <Rect width={400} height={400} fill="#20a8df" />
          </Layer>

          <Layer>
            <Circle x={75} y={75} mask radius={50} fill="green" />
            <UrlImage
              stroke="white"
              strokeWidth={5}
              width={75}
              height={75}
              src={profile}
            />
          </Layer>
          <Layer>
            <Text
              x={20}
              y={50}
              fontFamily="'Open Sans'"
              text={this.getTitleText()}
            />
            <Text
              x={20}
              y={150}
              fontFamily="'End'"
              fontSize={30}
              fontWeight={700}
              width={340}
              text={`${name} endorses Brandon Thomas for State House 49`}
            />
            <Text x={20} y={200} fontFamily="'Open Sans'" text={reason} />
          </Layer>
        </Stage>
        {this.stageRef && <div onClick={this.handleDownload}>Download</div>}
      </div>
    );
  }
}
