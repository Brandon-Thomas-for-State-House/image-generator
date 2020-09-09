// @flow
import React from "react";
// import style from "./Field.module.css";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "react-images-upload";

type Config = {
  required: boolean,
  type: "text" | "image",
  label: string,
  multiline: string
};

type Props = {
  config: Config,
  value: string,
  onChange: string => void
};

export default class Field extends React.Component<Props> {
  handleTextChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    this.props.onChange(value);
  };

  handleDrop = (_: {}[], dataUrls: string[]) => {
    console.log(dataUrls);
    this.props.onChange(dataUrls[0]);
  };

  renderImageLoader = () => {
    return (
      <ImageUploader
        withIcon
        buttonText="Choose images"
        onChange={this.handleDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  };

  renderTextField = () => {
    const { config, value } = this.props;

    return (
      <TextField
        multiline={config.multiline}
        rows={config.multiline ? 4 : 1}
        fullWidth
        variant="outlined"
        value={value}
        label={config.label}
        onChange={this.handleTextChange}
      />
    );
  };

  renderPicker() {
    switch (this.props.config.type) {
      case "text":
        return this.renderTextField();
      case "image":
        return this.renderImageLoader();
      default:
        throw new Error(
          `Config is not working because "type ${this.props.config.type}"" does not exist`
        );
    }
  }
  render() {
    return this.renderPicker();
  }
}
