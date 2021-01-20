export type Config = {
  type: string,
  label: string,
  required?: boolean,
  multiline?: boolean,
  maxlength?: number,
  helperText?: string
};

export const CONFIGS: { [key: string]: Config } = {
  name: {
    required: true,
    type: "text",
    label: "Your name"
  },
  reason: {
    multiline: true,
    type: "text",
    label: "Reason for support",
    maxLength: 300,
    helperText: "Why do you support Brandon? Specificity is better!"
  },
  profile: {
    type: "image",
    label: "Endorser Photo"
  },
  title: {
    type: "text",
    label: "Title",
    helperText: "i.e. Teacher, Parent, Voter"
  },
  location: {
    type: "text",
    label: "Location",
    helperText: "i.e. Murfreesboro, LaVergne Lake Elementary"
  }
  // canCampaignUse: {
  //   type: "checkbox",
  //   label: "Send to campaign for use in promotional materials.",
  //   defaultValue: true
  // }
};

export const REQUIRED_KEYS = Object.keys(CONFIGS).filter(
  k => !!CONFIGS[k].required
);
