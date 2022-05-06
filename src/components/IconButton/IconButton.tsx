import classNames from "classnames";
import * as React from "react";
import { useEffect, useRef } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  buttonClassName?: string;
  setFocus?: boolean;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, onClick, disabled, buttonClassName } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current !== null) {
      buttonRef.current.focus();
    }
  }, [buttonRef]);

  const containerClassName = classNames(disabled && styles.disabled);
  const className = classNames(buttonClassName, styles.button);

  return (
    <div className={containerClassName}>
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        ref={buttonRef}
      >
        <div className={styles.iconContainer}>{icon}</div>
      </button>
    </div>
  );
};

export { IconButton };
