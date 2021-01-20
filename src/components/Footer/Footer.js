// @flow
import React from "react";
import styles from "./Footer.module.css";
import Link from "@material-ui/core/Link";

const links = [
  {
    href: "https://secure.actblue.com/donate/thomas49/endorsement-generator",
    label: "Contribute"
  },
  {
    href:
      "https://www.mobilize.us/votebrandonthomas/?utm_source=endorsement-generator",
    label: "Volunteer"
  },
  {
    href: "https://votebrandonthomas.com/?utm_source=endorsement-generator",
    label: "votebrandonthomas.com"
  },
  {
    href: "mailto:kevinahuber@gmail.com",
    label: "Feedback"
  },
  {
    href: "https://kevinahuber.com",
    label: "Developed with ❤️ by Kevin Huber"
  }
];
export default function Footer() {
  return (
    <footer className={styles.component}>
      {links.map((l, i) => (
        <Link key={i} href={l.href} className={styles.link}>
          {l.label}
        </Link>
      ))}
    </footer>
  );
}
