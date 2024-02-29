import { Suspense } from "react";
import styled, { css, keyframes } from "styled-components";
import * as ReactDOM from "react-dom";
import { Center } from "../components/Center.jsx";
import BrandFigure from "/assets/brand/logo-agent-white.png";
import { Await, useLoaderData, Outlet } from "react-router-dom";
import { Authorize } from "../components/Authorize.jsx";
import { TrackCommands } from "../components/track-commands/TrackCommands.jsx";

function PageLanding() {
  const pending = useLoaderData();

  return (
    <Suspense
      fallback={
        <Wrapper>
          <img src={BrandFigure} alt="agent factory logo" />
        </Wrapper>
      }
    >
      <Await resolve={pending.afm}>
        {(afm) => (
          <>
            {ReactDOM.createPortal(
              <TrackCommands />,
              document.getElementById("flash-messages-react-root"),
            )}
            <Authorize>
              <Outlet />
            </Authorize>
          </>
        )}
      </Await>
    </Suspense>
  );
}

const animate = keyframes`
50% {
opacity: 0.1;
}
`;

const animateLoading = css`
  opacity: 1;
  animation: ${animate} 3s infinite;
`;

const Wrapper = styled(Center)`
  background-color: black;
  img {
    ${animateLoading}
  }
`;

export { PageLanding };
