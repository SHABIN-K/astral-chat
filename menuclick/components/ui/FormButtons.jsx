"use client";

import { useRef, useEffect } from "react";

const FormButtons = ({
  mainClass,
  primaryClass,
  secondaryClass,
  secondaryLabelClass,
  primaryLabelClass,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const primaryButtonRef = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        primaryButtonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className={mainClass}>
      <button
        type="button"
        className={secondaryClass}
        onClick={onSecondaryClick}
      >
        <span className={secondaryLabelClass}>{secondaryLabel}</span>
      </button>
      <button
        type="button"
        className={primaryClass}
        onClick={onPrimaryClick}
        ref={primaryButtonRef}
      >
        <span className={primaryLabelClass}>{primaryLabel}</span>
      </button>
    </div>
  );
};

export default FormButtons;
