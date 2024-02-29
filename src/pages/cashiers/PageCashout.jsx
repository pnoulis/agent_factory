import * as React from "react";
import styled from "styled-components";
import BackgroundCashout from "/assets/backgrounds/cashout.png";
import { FormCashout } from "#components/forms/FormCashout";
import { useSession } from "/src/hooks/useSession.jsx";

const saveComment = (comment) =>
  window.localStorage.setItem("comment", JSON.stringify(comment || ""));

function Component() {
  const { cashier, cashout } = useSession();
  const commentRef = React.useRef();
  commentRef.current ??= JSON.parse(window.localStorage.getItem("comment"));

  React.useEffect(() => {
    return () => saveComment(commentRef.current);
  }, []);

  return (
    <Page className="page">
      <Content>
        <StyledFormCashout
          onSubmit={({ fields }, onError) =>
            cashout(fields.comment).catch(onError)
          }
          cashier={cashier?.username}
          comment={commentRef.current}
          onChange={({ fields }) => {
            commentRef.current = fields.comment;
          }}
        />
      </Content>
    </Page>
  );
}

const StyledFormCashout = styled(FormCashout)`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 350px 1fr 300px;
  grid-template-rows: max-content 1fr;
  justify-content: center;

  .submit {
    grid-column: 3 / 4;
  }

  .comment-wrapper {
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 30px;
    align-items: end;
  }

  #comment {
    max-width: 700px;
    flex: 1;
    width: 100%;
    font-size: var(--tx-lg);
    letter-spacing: 1px;
    word-spacing: 5px;
    white-space: wrap;
    font-weight: 550;
    background-color: white;
    box-shadow: var(--sd-14), var(--sd-4);
    border-radius: var(--br-lg);
    padding: 25px 25px 25px 25px;
    background-image: url(${BackgroundCashout});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    box-sizing: border-box;
    overflow-wrap: anywhere;

    &::placeholder {
      font-weight: 550;
      letter-spacing: 2px;
      font-size: var(--tx-xxl);
    }
  }
`;

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 50px 20px 40px 20px;
  display: flex;
  flex-flow: column nowrap;
`;

const Content = styled("div")`
  flex: 1;
`;

export { Component };
