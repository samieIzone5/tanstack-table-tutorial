/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function IndeterminateCheckBox({ inderminate, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof inderminate === "boolean") {
      ref.current.inderminate = !rest.checked && inderminate;
    }
  }, [ref, inderminate]);
  return <input type="checkbox" ref={ref} {...rest} />;
}
