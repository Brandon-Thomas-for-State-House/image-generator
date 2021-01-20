// @flow
import React from "react";
import styles from "./Preview.module.css";
import {
  Stage,
  Layer,
  Text,
  Rect,
  Group,
  Circle,
  Label,
  Tag
} from "react-konva";
import { UrlImage } from "./components/UrlImage/UrlImage.js";
import differ from "../../lib/differ.js";
import brandon from "./brandon.png";

const REASON_FONT_SIZES = [
  { numLine: 1, fontSize: 54, length: 10 },
  { numLine: 1, fontSize: 38, length: 13 },
  { numLine: 1, fontSize: 32, length: 27 },
  { numLine: 2, fontSize: 26, length: 38 },
  { numLine: 3, fontSize: 22, length: 60 },
  { numLine: 3, fontSize: 18, length: 90 },
  { numLine: 4, fontSize: 17, length: 100 },
  { numLine: 4, fontSize: 15, length: 150 },
  { numLine: 4, fontSize: 13.5, length: 200 },
  { numLine: 5, fontSize: 12, length: 250 },
  { numLine: 5, fontSize: 10.8, length: 301 }
];

type Props = {
  name: string,
  title: string,
  location: string,
  reason: string,
  profile: string,
  hasRequired: boolean,
  onSetStageRef: (typeof Stage) => void
};

type State = {
  loaded: boolean,
  titleOffsetX: number,
  reasonFontSize: number,
  resizingReason: boolean,
  size: number
};

export default class Preview extends React.Component<Props, State> {
  state = {
    loaded: false,
    titleOffsetX: 0,
    reasonFontSize: 16,
    resizingReason: false,
    size: 400
  };

  reasonRef: typeof Text;
  titleRef: typeof Text;

  componentDidMount() {
    window.document.fonts.ready.then(
      function() {
        this.setState({ loaded: true });
      }.bind(this)
    );

    this.setState(({ size }) => {
      return { size: Math.min(size, window.screen.width - 60) };
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const isPropDiff = differ(this.props, prevProps);

    // If title is added
    if (isPropDiff("title") || (isPropDiff("location") && !!this.titleRef)) {
      this.setState({
        titleOffsetX: this.titleRef ? this.titleRef.width() : 0
      });
    }

    if (isPropDiff("reason")) setTimeout(() => this.forceUpdate(), 1);
  }
  circleClip(ctx: any) {
    ctx.arc(330, 70, 50, 0, Math.PI * 2, false);
  }

  getTitleText = () => {
    const { title, location } = this.props;
    return !(title && title.length)
      ? location
      : !!(location && location.length)
      ? `${title}, ${location}`
      : title;
  };

  hasTitle = () => {
    return !!(this.props.title || this.props.location);
  };

  renderTitle = () => {
    const titleText = this.getTitleText();
    return (
      !!titleText && (
        <Text
          ref={node => (this.titleRef = node)}
          fontFamily="'Barlow Condensed'"
          align="right"
          fontSize={16}
          padding={3}
          fill={styles.white}
          text={this.getTitleText()}
        />
      )
    );
  };

  renderFloatingTitle = () => {
    const { titleOffsetX } = this.state;

    return (
      this.hasTitle && (
        <Label x={380} y={110} width={360} offsetX={titleOffsetX} align="right">
          <Tag fill={styles.red} />
          {this.renderTitle()}
        </Label>
      )
    );
  };

  renderInlineTitle = () => {
    return (
      this.hasTitle && (
        <Label x={20} y={52} align="right">
          <Tag fill={styles.red} />
          {this.renderTitle()}
        </Label>
      )
    );
  };
  renderProfilePicture = () => {
    const { profile } = this.props;
    return (
      <Layer>
        <UrlImage x={0} y={240} width={400} height={142} src={brandon} />

        {!!profile && (
          <>
            <Circle
              x={330}
              y={70}
              width={110}
              fill={styles.white}
              height={110}
            />
            <Group clipFunc={this.circleClip}>
              <UrlImage x={280} y={20} width={100} height={100} src={profile} />
            </Group>
            {this.renderFloatingTitle()}
          </>
        )}
      </Layer>
    );
  };

  renderMetaData = () => {
    const { profile, name } = this.props;

    return (
      <Layer>
        <Text
          x={20}
          y={20}
          fontFamily="'Barlow Condensed'"
          fontSize={30}
          fontWeight={700}
          width={340}
          fill={styles.white}
          text={name}
        />
        {!!profile ? (
          <Group>
            <Text
              x={20}
              y={50}
              fontFamily="'Barlow Condensed'"
              fontSize={30}
              fontWeight={700}
              width={340}
              fill={styles.darkBlue}
              text="endorses"
            />
            <Text
              x={20}
              y={80}
              fontFamily="'Barlow Condensed'"
              fontSize={30}
              fontWeight={700}
              width={340}
              fill={styles.darkBlue}
              text="Brandon Thomas"
            />
          </Group>
        ) : (
          <Group>
            {this.hasTitle() && this.renderInlineTitle()}
            <Text
              x={20}
              y={this.hasTitle() ? 75 : 50}
              fontFamily="'Barlow Condensed'"
              fontSize={30}
              fontWeight={700}
              width={340}
              fill={styles.darkBlue}
              text="endorses Brandon Thomas"
            />
          </Group>
        )}
      </Layer>
    );
  };

  renderReason = () => {
    const { reason, profile } = this.props;
    if (!reason) return null;
    const { fontSize } =
      REASON_FONT_SIZES.find(size => size.length > reason.length) || {};
    return (
      <Layer>
        <Group y={!!profile ? 130 : 120}>
          <Group x={25} y={5} width={340}>
            <Text
              ref={node => {
                this.reasonRef = node;
              }}
              padding={10}
              fontSize={fontSize}
              lineHeight={1.4}
              fontWeight={100}
              width={360}
              fill={styles.darkBlue}
              fontFamily="'Open Sans'"
              text={reason}
            />
          </Group>
          <Text
            x={15}
            y={0}
            fontSize={50}
            fontWeight={100}
            fill={styles.darkBlue}
            fontFamily="'Open Sans'"
            text="“"
          />
          <Text
            x={this.reasonRef ? Math.max(this.reasonRef.width() - 5, 95) : 30}
            y={this.reasonRef ? Math.min(this.reasonRef.height() - 5, 90) : 30}
            fontSize={50}
            fontWeight={100}
            fill={styles.darkBlue}
            fontFamily="'Open Sans'"
            text="”"
          />
        </Group>
      </Layer>
    );
  };
  renderFooter() {
    return (
      <Layer>
        <Text
          x={0}
          y={385}
          fontFamily="'Barlow Condensed'"
          fontSize={12}
          fontWeight={700}
          width={400}
          align="center"
          fill={styles.darkBlue}
          text="votebrandonthomas.com/endorse"
        />
      </Layer>
    );
  }
  renderPreview = () => {
    const { size } = this.state;
    const { onSetStageRef } = this.props;
    return (
      <div>
        <div className={styles.title}>Preview</div>
        <Stage
          width={size}
          height={size}
          scale={{ x: size / 400, y: size / 400 }}
          ref={onSetStageRef}
        >
          <Layer>
            <Rect width={400} height={400} fill="#5FBCE5" />
          </Layer>
          {this.renderProfilePicture()}
          {this.renderMetaData()}
          {this.renderReason()}
          {this.renderFooter()}
        </Stage>
      </div>
    );
  };

  renderEmpty() {
    return (
      <div className={styles.empty}>
        Enter a name, reason, and photo for why{" "}
        <span className={styles.highlight}>you</span> support Brandon to
        generate a sharable image!
      </div>
    );
  }
  render() {
    const { name } = this.props;
    const { loaded } = this.state;

    return (
      <div className={styles.component}>
        {loaded && name ? this.renderPreview() : this.renderEmpty()}
      </div>
    );
  }
}
