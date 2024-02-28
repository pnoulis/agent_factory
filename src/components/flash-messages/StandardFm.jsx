import styled from "styled-components";

const StandardFm = styled.div`
  margin-left: auto;
  pointer-events: none;
  min-height: 50px;
  height: auto;
  padding: 5px 20px;
  min-width: 400px;
  width: max-content;
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
    color: white;
    font-size: var(--tx-nl);
    word-spacing: 2px;
    font-weight: 600;
    flex: 1;
    width: max-content;
    order: 1;
    overflow-wrap: anywhere;
  }

  .icon {
    flex: 0 0 30px;
    order: 2;
    height: 30px;
    fill: white;
  }
`;

export { StandardFm };
