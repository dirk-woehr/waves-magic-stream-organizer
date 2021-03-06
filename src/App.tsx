import { useState } from "react";
import { SongRequest } from "./interface/SongRequest";
import styles from "./App.module.css";
import { SongRequestItem } from "./components/SongRequestItem";
import { IconButton } from "./components/IconButton";
import { FileExport } from "tabler-icons-react";
import { FileImport } from "tabler-icons-react";
import { PlaylistAdd } from "tabler-icons-react";
import moment from "moment";
import saveAs from "file-saver";
import backgroundImage from "./assets/background.jpeg";
import { useRequestImports } from "./hooks/useRequestImport";
import { useHotkeys } from "react-hotkeys-hook";
import { NewRequestDialog } from "./components/NewRequestDialog";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [newRequest, setNewRequest] = useState<SongRequest | null>(null);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const { handleLoad, handleappend } = useRequestImports(
    requests,
    (songRequests: SongRequest[]) => {
      setRequests(songRequests);
    }
  );

  useHotkeys("escape", () => setDialogContent(null));

  const viewedCount = requests.filter((request) => {
    return request.viewed;
  }).length;

  const handleAddRequest = (request: SongRequest | null) => {
    setNewRequest(null);
    if (request === null) return;
    const newRequests: SongRequest[] = [...requests, request];
    setRequests(newRequests);
  };

  const handleEditNewRequest = (request: SongRequest) => {
    setNewRequest(request);
  };

  const openNewRequestDialog = () => {
    setNewRequest({
      id: uuidv4(),
      requestedBy: "",
      link: "",
      comment: "",
      viewed: false,
    });
  };

  const handleSetRequests = (songRequests: SongRequest[]) => {
    setRequests(songRequests);
  };

  const requestItems = requests.map((request, index) => {
    return (
      <SongRequestItem
        onUpdateRequests={handleSetRequests}
        songRequests={requests}
        index={index}
        setDialogContent={(content: JSX.Element | null) => {
          setDialogContent(content);
        }}
        key={"sri_" + index}
      />
    );
  });

  const handleSave = () => {
    var jsonRequests = JSON.stringify(requests);
    var blob = new Blob([jsonRequests], {
      type: "application/json;charset=utf-8",
    });
    saveAs(
      blob,
      "stream_requests_" + moment().format("YYYY_MM_DD_HH_mm_ss") + ".json"
    );
  };

  const iconText = (
    <div className={styles.iconTextContainer}>
      <FileExport /> <span>Save Requests</span>
    </div>
  );

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  return (
    <div style={backgroundStyle}>
      <div className={styles.app}>
        <h1 className={styles.header}>Wave's Magic Stream Organizer</h1>
        <p className={styles.viewCount}>
          Viewed: {viewedCount} of {requests.length}
        </p>
        <div className={styles.itemContainer}>{requestItems}</div>
        <button onClick={openNewRequestDialog} className={styles.addButton}>
          Add Request
        </button>
        <div className={styles.storageButtonContainer}>
          <IconButton
            onClick={handleSave}
            disabled={false}
            icon={iconText}
            buttonClassName={styles.storageButton}
          ></IconButton>
          <div>
            <label htmlFor={"loadFile"} className={styles.storageInputLabel}>
              <FileImport /> Load Requests
            </label>
            <input
              id={"loadFile"}
              className={styles.storageInput}
              type={"file"}
              onChange={handleLoad}
            />
          </div>
          <div>
            <label
              htmlFor={"appendRequests"}
              className={styles.storageInputLabel}
            >
              <PlaylistAdd /> Append Requests
            </label>
            <input
              id={"appendRequests"}
              className={styles.storageInput}
              type={"file"}
              onChange={handleappend}
            />
          </div>
        </div>
      </div>
      {dialogContent !== null && (
        <div
          className={styles.modalBackground}
          onClick={() => {
            setDialogContent(null);
          }}
        >
          <div className={styles.modalContentContainer}>{dialogContent}</div>
        </div>
      )}
      {newRequest !== null && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContentContainer}>
            <NewRequestDialog
              songRequest={newRequest}
              setSongRequest={handleEditNewRequest}
              onClose={handleAddRequest}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
