// @flow
import React from "react";
import style from "./Title.module.css";

export default function Title() {
  return (
    <div className={style.component}>
      <div className={style.case}>
        <div className={style.title}>
          We endorse <span className={style.candidate}>Brandon Thomas</span>{" "}
        </div>
        <div className={style.tagline}>(generator)</div>
      </div>
    </div>
  );
}
