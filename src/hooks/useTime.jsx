// ------------------------------ std libs ------------------------------- //
// ------------------------------ 3rd libs ------------------------------- //
import * as React from "react";
// ------------------------------ own libs ------------------------------- //
// ------------------------------ project  ------------------------------- //

/**
 * useTime
 * @example
 *
 */

function useTime({ tmilsec = Date.now(), eachSec } = {}) {
  const [time, setTime] = React.useState(null);
  const localeRef = React.useRef(null);
  const eachSecRef = React.useRef(null);
  const lang = "en-US";

  React.useEffect(() => {
    localeRef.current = new Intl.DateTimeFormat(lang, {
      month: "short",
      weekday: "short",
      day: "numeric",
      hour: "2-digit",
      second: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
    });

    setTime(
      localeRef.current.formatToParts(tmilsec).reduce((car, cdr) => {
        car[cdr.type] = cdr.value;
        return car;
      }, {}),
    );
  }, [lang]);

  React.useEffect(() => {
    if (!eachSec) {
      clearTimeout(eachSecRef?.current);
      return;
    }
    eachSecRef.current = setInterval(() => {
      setTime(
        localeRef.current.formatToParts(Date.now()).reduce((car, cdr) => {
          car[cdr.type] = cdr.value;
          return car;
        }, {}),
      );
    }, 1000);

    return () => clearTimeout(eachSecRef.current);
  }, [eachSec]);

  return time || {};
}

export { useTime };
