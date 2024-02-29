import styled from "styled-components";
import { Heading } from "./Heading.jsx";
import { DialogAlertStandard } from "./DialogAlertStandard.jsx";

function AlertDeregisterCashiers({ cmds, onClose }) {
  cmds ||= [];

  return (
    <ThisDialog initialOpen onClose={onClose}>
      <Heading>deregister cashiers</Heading>
      <div className="description">
        <ul className="content">
          {cmds.map(({ status, value, reason }, i) => {
            return status === "rejected" ? (
              <li className="error" key={i}>
                <span>{reason.args.cashier.username}</span>
                <span>{getMsg(reason)}</span>
              </li>
            ) : (
              <li key={i}>
                <span>{value.args.cashier.username}</span>
                <span>{getMsg(value, "cmd")}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </ThisDialog>
  );
}

const ThisDialog = styled(DialogAlertStandard)`
  .content {
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    font-size: var(--tx-nl);
  }

  span:nth-of-type(1)::after {
    content: ":";
    margin: 0 3px 0 5px;
    font-weight: 600;
  }

  span:nth-of-type(2) {
    text-wrap: wrap;
    overflow-wrap: anywhere;
  }

  li {
    padding: 0 10px;
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: max-content;
    gap: 25px;
    justify-content: center;
  }

  .error span:nth-of-type(2) {
    color: var(--error-base);
  }
`;

export { AlertDeregisterCashiers };
