// @flow
import React from "react";
import style from "./Editor.module.css";
import Preview from "../Preview/Preview.js";
import Field from "../Field/Field.js";

type Props = {};

const config = {
  name: {
    required: true,
    type: "text",
    label: "Name"
  },
  title: {
    required: true,
    type: "text",
    label: "Title"
  },
  location: {
    type: "text",
    label: "Location"
  },
  reason: {
    multiline: true,
    type: "text",
    label: "Reason for Support"
  },
  profile: {
    type: "image",
    label: "image "
  }
};

export type Form = {};

type State = {
  form: Form
};

export default class Editor extends React.Component<Props, State> {
  state = {
    form: Object.keys(config).reduce((m, k: string) => ({ ...m, [k]: k }), {})
  };

  handleFormChange = (name: string): (string => void) => (value: string) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: value
      }
    }));
  };

  render() {
    const { form } = this.state;

    return (
      <div className={style.component}>
        <div className={style.fields}>
          {Object.keys(form).map(k => (
            <div key={k} className={style.field}>
              <Field
                config={config[k]}
                value={form[k]}
                onChange={this.handleFormChange(k)}
              />
            </div>
          ))}
        </div>
        <div className={style.preview}>
          <Preview {...form} />
        </div>
      </div>
    );
  }
}
