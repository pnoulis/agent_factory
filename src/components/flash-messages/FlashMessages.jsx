import * as React from "react";
import styled from "styled-components";
import { Svg } from "react_utils/svgs";
import IconInfo from "/assets/icons/semantic-info-outlined.svg?react";
import IconSuccess from "/assets/icons/semantic-success-outlined.svg?react";
import IconWarning from "/assets/icons/semantic-warning-outlined.svg?react";
import IconError from "/assets/icons/semantic-warning-outlined.svg?react";

function FlashMessages({ fms = [], setfms } = {}) {
  function rmStales() {
    const now = Date.now();
    const remainder = [];
    for (let i = 0; i < fms.length; i++) {
      if (now > fms[i].timeout) continue;
      remainder.push(fms[i]);
    }
    if (remainder.length !== fms.length) setfms(remainder);
  }

  React.useEffect(() => {
    const e = window.setInterval(rmStales, [1000]);
    return () => window.clearInterval(e);
  }, [fms, setfms]);

  return (
    <RootFm>
      {fms.map((fm, i) => {
        switch (fm.type) {
          case "success":
            return (
              <StandardFm key={i} $variant="success">
                <Svg className="icon">
                  <IconSuccess />
                </Svg>
                <p className="msg">{fm.msg}</p>
              </StandardFm>
            );
          case "info":
            return (
              <StandardFm key={i} $variant="info">
                <Svg className="icon">
                  <IconInfo />
                </Svg>
                <p className="msg">{fm.msg}</p>
              </StandardFm>
            );
          case "warn":
            return (
              <StandardFm key={i} $variant="warn">
                <Svg className="icon">
                  <IconWarning />
                </Svg>
                <p className="msg">{fm.msg}</p>
              </StandardFm>
            );
          case "error":
            return (
              <StandardFm key={i} $variant="error">
                <Svg className="icon">
                  <IconError />
                </Svg>
                <p className="msg">{fm.msg}</p>
              </StandardFm>
            );
          default:
            throw new Error(`Unknown flash message type: ${type}`);
        }
      })}
    </RootFm>
  );
}

const RootFm = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  padding: 30px;
`;

const StandardFm = styled.div`
  margin-left: auto;
  pointer-events: none;
  min-height: 70px;
  height: auto;
  padding: 10px 20px;
  width: 600px;
  border-radius: var(--br-nl);
  box-shadow: var(--sd-8);
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case "info":
        return "var(--info-strong)";
      case "success":
        return "var(--success-medium)";
      case "warn":
        return "var(--warn-medium)";
      case "error":
        return "var(--error-base)";
      default:
        return "black";
    }
  }};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  .msg {
    font-size: var(--tx-md);
    word-spacing: 2px;
    font-weight: 600;
    flex: 1;
    order: 1;
    overflow-wrap: anywhere;
  }

  .icon {
    flex: 0 0 50px;
    order: 2;
    height: 50px;
    fill: white;
  }
`;

export { FlashMessages };
