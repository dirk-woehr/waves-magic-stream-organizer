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

function App() {
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  console.log({ dialogContent });

  const { handleLoad, handleappend } = useRequestImports(
    requests,
    (songRequests: SongRequest[]) => {
      setRequests(songRequests);
    }
  );

  const viewedCount = requests.filter((request) => {
    return request.viewed;
  }).length;

  const onAddRequest = () => {
    const newRequests: SongRequest[] = [
      ...requests,
      {
        link: "",
        requestedBy: "",
        comment: "",
        viewed: false,
      },
    ];
    setRequests(newRequests);
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
    <div id={"appbg"} style={backgroundStyle}>
      <div className={styles.app}>
        <h1 className={styles.header}>Wave's Magic Stream Organizer</h1>
        <p className={styles.viewCount}>
          Viewed: {viewedCount} of {requests.length}
        </p>
        <div className={styles.itemcontainer}>{requestItems}</div>
        <button onClick={onAddRequest} className={styles.addButton}>
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
    </div>
  );
}

export default App;
