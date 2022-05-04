import * as React from "react";
import { SongRequest } from "../../interface/SongRequest";
import { IconButton } from "../IconButton";
import { ArrowBarToUp } from "tabler-icons-react";
import { ArrowUp } from "tabler-icons-react";
import { ArrowDown } from "tabler-icons-react";
import { ArrowBarToDown } from "tabler-icons-react";
import { Eye } from "tabler-icons-react";
import { EyeOff } from "tabler-icons-react";
import { ClipboardCheck } from "tabler-icons-react";
import { Trash } from "tabler-icons-react";
import styles from "./SongRequestItem.module.css";
import classnames from "classnames";

interface SongRequestItemProps {
  songRequests: SongRequest[];
  index: number;
  onUpdateRequests: (songRequests: SongRequest[]) => void;
  setDialogContent: (content: JSX.Element | null) => void;
}

const SongRequestItem: React.FC<SongRequestItemProps> = (props) => {
  const { songRequests, index, onUpdateRequests, setDialogContent } = props;
  const songRequest = songRequests[index];

  const eyeIcon = songRequest.viewed ? <Eye /> : <EyeOff />;

  const handleMoveUp = () => {
    const requests = [...songRequests];
    var f = requests.splice(index, 1)[0];
    // insert stored item into position `to`
    requests.splice(index - 1, 0, f);
    onUpdateRequests(requests);
  };

  const handleMoveDown = () => {
    const requests = [...songRequests];
    var f = requests.splice(index, 1)[0];
    // insert stored item into position `to`
    requests.splice(index + 1, 0, f);
    onUpdateRequests(requests);
  };

  const handleMoveTop = () => {
    const requests = [...songRequests];
    var f = requests.splice(index, 1)[0];
    // insert stored item into position `to`
    requests.splice(0, 0, f);
    onUpdateRequests(requests);
  };

  const handleMoveBottom = () => {
    const requests = [...songRequests];
    var f = requests.splice(index, 1)[0];
    // insert stored item into position `to`
    requests.splice(songRequests.length - 1, 0, f);
    onUpdateRequests(requests);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const requests = [...songRequests];
    requests[index] = {
      ...requests[index],
      link: event.target.value.toString(),
    };
    onUpdateRequests(requests);
  };

  const handleRequestedByChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const requests = [...songRequests];
    requests[index] = {
      ...requests[index],
      requestedBy: event.target.value.toString(),
    };
    onUpdateRequests(requests);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const requests = [...songRequests];
    requests[index] = {
      ...requests[index],
      comment: event.target.value.toString(),
    };
    onUpdateRequests(requests);
  };

  const handleToggleViewed = () => {
    const requests = [...songRequests];
    requests[index] = {
      ...requests[index],
      viewed: !songRequests[index].viewed,
    };
    onUpdateRequests(requests);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(songRequest.link);
  };

  const handleDelete = () => {
    const requests = [...songRequests];
    requests.splice(index, 1);
    onUpdateRequests(requests);
  };

  const inputContaierClass = classnames(
    styles.inputContainer,
    songRequest.viewed && styles.viewed
  );

  const hideDeleteDialog = () => {
    setDialogContent(null);
  };

  const deleteDialog = (
    <div className={styles.deleteDialog}>
      <h3 className={styles.deleteDialogHeader}>Delete request?</h3>
      <div className={styles.deleteDialogButtons}>
        <IconButton
          onClick={hideDeleteDialog}
          icon={
            <span className={styles.buttonIconText}>
              <Trash /> <span>Cancel</span>
            </span>
          }
          disabled={false}
          buttonClassName={styles.moveButton}
        ></IconButton>
        <IconButton
          onClick={handleDelete}
          icon={
            <span className={styles.buttonIconText}>
              <Trash /> <span>Delete request</span>
            </span>
          }
          disabled={false}
          buttonClassName={styles.deleteButton}
        ></IconButton>
      </div>
    </div>
  );

  const showDeleteDialog = () => {
    setDialogContent(deleteDialog);
  };

  const requestedByInput = classnames(styles.input, styles.requestedBy);

  return (
    <div className={styles.item}>
      <div className={styles.buttonContainer}>
        <IconButton
          onClick={handleMoveTop}
          icon={<ArrowBarToUp />}
          disabled={index === 0}
          buttonClassName={styles.moveButton}
        ></IconButton>
        <IconButton
          onClick={handleMoveUp}
          icon={<ArrowUp />}
          disabled={index === 0}
          buttonClassName={styles.moveButton}
        ></IconButton>
        <IconButton
          onClick={handleMoveDown}
          icon={<ArrowDown />}
          disabled={index >= songRequests.length - 1}
          buttonClassName={styles.moveButton}
        ></IconButton>
        <IconButton
          onClick={handleMoveBottom}
          icon={<ArrowBarToDown />}
          disabled={index >= songRequests.length - 1}
          buttonClassName={styles.moveButton}
        ></IconButton>
        <IconButton
          onClick={handleToggleViewed}
          icon={eyeIcon}
          disabled={false}
          buttonClassName={styles.actionButton}
        ></IconButton>
        <IconButton
          onClick={handleCopyLink}
          icon={<ClipboardCheck />}
          disabled={false}
          buttonClassName={styles.actionButton}
        ></IconButton>
        <IconButton
          onClick={showDeleteDialog}
          icon={<Trash />}
          disabled={false}
          buttonClassName={styles.deleteButton}
        ></IconButton>
      </div>
      <div className={inputContaierClass}>
        <input
          className={requestedByInput}
          type={"text"}
          onChange={handleRequestedByChange}
          placeholder={"Requested by"}
          value={songRequest.requestedBy}
          disabled={songRequest.viewed}
        ></input>
        {!songRequest.viewed && (
          <input
            className={styles.input}
            type={"text"}
            onChange={handleLinkChange}
            placeholder={"Link"}
            value={songRequest.link}
            disabled={songRequest.viewed}
          ></input>
        )}
        {!songRequest.viewed && (
          <textarea
            className={styles.input}
            onChange={handleCommentChange}
            placeholder={"Comment"}
            value={songRequest.comment}
            disabled={songRequest.viewed}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export { SongRequestItem };
