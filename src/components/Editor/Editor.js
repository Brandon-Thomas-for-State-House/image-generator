// @flow
import React from "react";
import style from "./Editor.module.css";
import Preview from "../Preview/Preview.js";
import Field from "../Field/Field.js";
import DownloadButton from "./components/DownloadButton/DownloadButton.js";
import { Stage } from "react-konva";
import { CONFIGS, REQUIRED_KEYS } from "../../lib/config.js";
import { type Config } from "../../lib/config.js";
type Props = {};

export type Form = {
  name: string,
  title: string,
  location: string,
  reason: string,
  profile: string,
  canCampaignUse: string
};

type State = {
  form: Form
};

export default class Editor extends React.Component<Props, State> {
  stageRef: typeof Stage;

  state = {
    form: Object.keys(CONFIGS).reduce(
      (m, k: string) => ({ ...m, [k]: CONFIGS[k].defaultValue }),
      {}
    )
  };

  handleFormChange = (name: string): (string => void) => (value: string) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: value
      }
    }));
  };

  hasRequired = () => {
    return REQUIRED_KEYS.every(k => !!this.state.form[k]);
  };

  handleSetStageRef = (node: typeof Stage) => {
    this.stageRef = node;
  };

  renderField(config: Config, value: any, onChange: any => void, key: string) {
    return (
      <div key={key} className={style.field}>
        <Field config={config} value={value} onChange={onChange} />
      </div>
    );
  }

  buildTrackingData(form: Form) {
    return form && form.canCampaignUse
      ? form
      : Object.keys(form).reduce(
          (m, k) => ({ ...m, [k]: (form[k] || "").length }),
          {}
        );
  }

  render() {
    const { form } = this.state;

    return (
      <main role="main" className={style.component}>
        <div className={style.preview}>
          <Preview
            onSetStageRef={this.handleSetStageRef}
            hasRequired={this.hasRequired()}
            {...form}
          />
        </div>
        <div className={style.fields}>
          {Object.keys(form).map(k =>
            this.renderField(CONFIGS[k], form[k], this.handleFormChange(k), k)
          )}
          {this.stageRef && (
            <DownloadButton
              name={form.name}
              stageRef={this.stageRef}
              trackingData={this.buildTrackingData(form)}
            />
          )}
        </div>
      </main>
    );
  }
}
