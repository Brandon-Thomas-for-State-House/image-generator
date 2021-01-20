// @flow
import React, { Component } from "react";
import styles from "./ImagePicker.module.css";
import ImageUploader from "react-images-upload";
import Cropper from "react-easy-crop";
import cropper from "../../lib/cropper.js";
import Slider from "@material-ui/core/Slider";

type Props = {
  onChange: string => void,
  value: string,
  label: string
};

type State = {
  droppedUrl: string,
  zoom: number,
  crop: { x: number, y: number }
};

export default class ImagePicker extends Component<Props, State> {
  state = {
    droppedUrl: "",
    crop: { x: 0, y: 0 },
    zoom: 1
  };

  onCropChange = (crop: { x: number, y: number }) => {
    this.setState({ crop });
  };

  onZoomChange = (zoom: number) => {
    this.setState({ zoom });
  };

  handleDrop = (_: {}[], dataUrls: string[]) => {
    const droppedUrl = dataUrls[0];
    this.setState({ droppedUrl });
  };

  handleDelete = () => {
    this.setState({ droppedUrl: undefined });
    this.props.onChange("");
  };

  onCropComplete = async (_: any, croppedAreaPixels: any) => {
    const { droppedUrl } = this.state;
    if (!isNaN(croppedAreaPixels.width)) {
      const croppedUrl = await cropper(droppedUrl, croppedAreaPixels);
      this.props.onChange(croppedUrl);
    }
  };

  renderImageLoader = () => {
    return (
      <ImageUploader
        withIcon
        singleImage
        maxFileSize={5242880 * 2}
        className={styles.uploader}
        label="< 10Mb jpg, gif, png"
        buttonText="Choose picture of endorser (thats you!)"
        onChange={this.handleDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      />
    );
  };

  renderCropper = () => {
    const { crop, zoom, droppedUrl } = this.state;
    return (
      <div>
        <div className={styles.cropper}>
          <Cropper
            image={droppedUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </div>
        <Slider
          className={styles.slider}
          value={zoom}
          min={1}
          max={3}
          step={0.05}
          aria-labelledby="Zoom"
          onChange={(e, z) => this.onZoomChange(z)}
        />
        <div className={styles.button} onClick={this.handleDelete}>
          Remove or Change Image
        </div>
      </div>
    );
  };

  render() {
    const { droppedUrl } = this.state;
    return (
      <div>{droppedUrl ? this.renderCropper() : this.renderImageLoader()}</div>
    );
  }
}
