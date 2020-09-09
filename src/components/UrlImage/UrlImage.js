import React, { Component } from "react";
import { Image } from "react-konva";

export class UrlImage extends Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
    this.applyCache();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
      this.applyCache();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.width = this.props.width;
    this.image.height = this.props.height;
    this.image.addEventListener("load", this.handleLoad);
  }
  applyCache() {
    this.imageNode.cache();
    this.imageNode.getLayer().batchDraw();
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  render() {
    return (
      <Image
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        {...this.props}
      />
    );
  }
}
