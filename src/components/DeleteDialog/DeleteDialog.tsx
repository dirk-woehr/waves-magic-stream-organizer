import * as React from "react";
import { CircleOff, Trash } from "tabler-icons-react";
import { IconButton } from "../IconButton";

import styles from "./DeleteDialog.module.css";

interface DeleteDialogProps {
  hideDeleteDialog: () => void;
  handleDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  const { hideDeleteDialog, handleDelete } = props;

  return (
    <div className={styles.deleteDialog}>
      <h3 className={styles.deleteDialogHeader}>Delete request?</h3>
      <div className={styles.deleteDialogButtons}>
        <IconButton
          onClick={hideDeleteDialog}
          icon={
            <span className={styles.buttonIconText}>
              <CircleOff /> <span>Cancel</span>
            </span>
          }
          buttonClassName={styles.cancelButton}
        ></IconButton>
        <IconButton
          onClick={handleDelete}
          icon={
            <span className={styles.buttonIconText}>
              <Trash /> <span>Delete request</span>
            </span>
          }
          setFocus
          buttonClassName={styles.deleteButton}
        ></IconButton>
      </div>
    </div>
  );
};

export { DeleteDialog };
