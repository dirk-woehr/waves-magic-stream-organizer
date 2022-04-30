import classNames from "classnames";
import * as React from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
  buttonClassName?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, onClick, disabled, buttonClassName } = props;

  const containerClassName = classNames(disabled && styles.disabled);
  const className = classNames(buttonClassName, styles.button);

  return (
    <div className={containerClassName}>
      <button className={className} onClick={onClick} disabled={disabled}>
        <div className={styles.iconContainer}>{icon}</div>
      </button>
    </div>
  );
};

export { IconButton };
