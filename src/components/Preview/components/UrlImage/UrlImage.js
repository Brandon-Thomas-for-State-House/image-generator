import React, { Component } from "react";
import { Image } from "react-konva";

const EXCLUDED_PROPS = ["src"];
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
    this.image.addEventListener("load", this.handleLoad);
  }
  applyCache() {
    // this.imageNode.cache();
    // this.imageNode.getLayer().batchDraw();
  }
  handleLoad = () => {
    this.setState({
      image: this.image
    });
  };

  filteredProps = () => {
    return Object.keys(this.props)
      .filter(f => !EXCLUDED_PROPS.includes(f))
      .reduce((sum, el) => ({ ...sum, [el]: this.props[el] }), {});
  };

  render() {
    return (
      <Image
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        {...this.filteredProps()}
      />
    );
  }
}
