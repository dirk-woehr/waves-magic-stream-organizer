import * as React from "react";
import { SongRequest } from "../../interface/SongRequest";
import styles from "./NewRequestDialog.module.css";
import songRequestStyles from "../SongRequestItem/SongRequestItem.module.css";
import { ChangeEvent } from "react";
import classnames from "classnames";
import { CircleOff, PlaylistAdd } from "tabler-icons-react";
import { IconButton } from "../IconButton";

interface NewRequestDialogProps {
  setSongRequest: (newRequest: SongRequest) => void;
  onClose: (newRequest: SongRequest | null) => void;
  songRequest: SongRequest;
}

const NewRequestDialog: React.FC<NewRequestDialogProps> = (props) => {
  const { songRequest, setSongRequest, onClose } = props;

  const handleRequestedByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRequest = {
      ...songRequest,
      requestedBy: event.target.value.toString(),
    };
    setSongRequest(newRequest);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRequest = {
      ...songRequest,
      link: event.target.value.toString(),
    };
    setSongRequest(newRequest);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newRequest = {
      ...songRequest,
      comment: event.target.value.toString(),
    };
    setSongRequest(newRequest);
  };

  const hideAddDialog = () => {
    onClose(null);
  };

  const handleAdd = () => {
    onClose(songRequest);
  };

  const requestedByInput = classnames(
    songRequestStyles.input,
    songRequestStyles.requestedBy
  );

  return (
    <div className={styles.newRequestDialog}>
      <h3 className={styles.dialogHeader}>Add new request</h3>
      <div className={songRequestStyles.textFieldContainer}>
        <input
          className={requestedByInput}
          type={"text"}
          onChange={handleRequestedByChange}
          placeholder={"Requested by"}
          value={songRequest.requestedBy}
          disabled={songRequest.viewed}
        ></input>
        <input
          className={songRequestStyles.input}
          type={"text"}
          onChange={handleLinkChange}
          placeholder={"Link"}
          value={songRequest.link}
          disabled={songRequest.viewed}
        ></input>
      </div>
      <textarea
        className={songRequestStyles.input}
        onChange={handleCommentChange}
        placeholder={"Comment"}
        value={songRequest.comment}
        disabled={songRequest.viewed}
      ></textarea>
      <div className={styles.deleteDialogButtons}>
        <IconButton
          onClick={hideAddDialog}
          icon={
            <span className={styles.buttonIconText}>
              <CircleOff /> <span>Cancel</span>
            </span>
          }
          buttonClassName={styles.cancelButton}
        ></IconButton>
        <IconButton
          onClick={handleAdd}
          icon={
            <span className={styles.buttonIconText}>
              <PlaylistAdd /> <span>Add request</span>
            </span>
          }
          setFocus
          buttonClassName={styles.deleteButton}
        ></IconButton>
      </div>
    </div>
  );
};

export { NewRequestDialog };
