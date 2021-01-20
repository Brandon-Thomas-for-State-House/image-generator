// @flow
import React from "react";
import TextField from "@material-ui/core/TextField";
import ImagePicker from "../ImagePicker/ImagePicker.js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
// TODO: Sep each types configs
type Config = {
  required: boolean,
  type: "text" | "image",
  label: string,
  multiline: string,
  helperText: string,
  options: [],
  maxLength: number
};

type Props = {
  config: Config,
  value: string,
  onChange: string => void
};

export default class Field extends React.Component<Props> {
  handleInputChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    this.props.onChange(value);
  };

  handleCheckboxChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const value = evt.target.checked;
    this.props.onChange(value);
  };

  renderImageLoader = () => {
    const { config, value, onChange } = this.props;

    return (
      <ImagePicker onChange={onChange} value={value} label={config.label} />
    );
  };

  renderRadio = () => {
    const { config, value } = this.props;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label={config.label}
          name={config.label}
          value={value}
          onChange={this.handleInputChange}
        >
          {config.options.map(option => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  renderTextField = () => {
    const { config, value } = this.props;
    const remainingCharacters = value
      ? config.maxLength - value.length
      : config.maxLength;
    const helperText =
      config.maxLength && remainingCharacters < 10
        ? `Character's Remaining: ${remainingCharacters}`
        : config.helperText;
    return (
      <TextField
        error={config.maxLength && remainingCharacters < 10}
        multiline={config.multiline}
        rows={config.multiline ? 4 : 1}
        fullWidth
        variant="outlined"
        value={value}
        label={config.label}
        helperText={helperText}
        onChange={this.handleInputChange}
        inputProps={{ maxLength: config.maxLength, "aria-label": config.label }}
      />
    );
  };

  renderCheckbox() {
    const { config, value } = this.props;

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={this.handleCheckboxChange}
            name={config.label}
          />
        }
        aria-label={config.label}
        label={config.label}
      />
    );
  }

  renderPicker() {
    switch (this.props.config.type) {
      case "text":
        return this.renderTextField();
      case "image":
        return this.renderImageLoader();
      case "radio":
        return this.renderRadio();
      case "checkbox":
        return this.renderCheckbox();
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
