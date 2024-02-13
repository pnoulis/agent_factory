import { useHover } from "/src/hooks/useHover.jsx";
import styled from "styled-components";
// List of language tags according to RFC 5646.
// See <http://tools.ietf.org/html/rfc5646> for info on how to parse
// these language tags. Some duplicates have been removed.

const langs = {
  "en-US": {
    short: "en",
    long: "english",
  },
  "ar-SA": {
    short: "ar",
    long: "arabic",
  },
  "da-DK": {
    short: "dk",
    long: "danish",
  },
  "fr-FR": {
    short: "fr",
    long: "french",
  },
  "de-DE": {
    short: "de",
    long: "german",
  },
};

function WidgetLanguage({ language, style, className, onChange }) {
  const [hovering, onHover] = useHover();

  return (
    <Dropdown className={className} style={style}>
      <DropdownTrigger {...onHover}>
        <p>{langs[language]?.short || langs["en-US"].short}</p>
        <DropdownWrapper open={hovering}>
          <DropdownList>
            {Object.keys(langs)
              .filter((lang) => lang !== language)
              .map((lang) => (
                <DropdownOption onClick={() => onChange?.(lang)} key={lang}>
                  {langs[lang].long}
                </DropdownOption>
              ))}
          </DropdownList>
        </DropdownWrapper>
      </DropdownTrigger>
    </Dropdown>
  );
}

const Dropdown = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  z-index: 100;
`;

const DropdownTrigger = styled("li")`
  z-index: 100;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
  font-size: var(--tx-md);
  p {
    margin-bottom: 2px;
    font-weight: 500;
    margin-left: auto;
  }
`;

const DropdownWrapper = styled("div")`
  display: ${({ open }) => (open ? "flex" : "none")};
  z-index: 100;
  position: absolute;
  top: 35px;
  padding-top: 10px;
  right: 0;
`;

const DropdownList = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  min-width: 200px;
  background-color: var(--grey-light);
  border-radius: var(--br-nl);
  text-align: center;
  text-transform: uppercase;
  padding: 5px 0;
`;

const DropdownOption = styled("li")`
  z-index: 100;
  &:hover {
    background-color: var(--grey-subtle);
  }
`;

export { WidgetLanguage };
