import { useState } from "react";
import { SongRequest } from "./interface/SongRequest";
import styles from "./App.module.css";
import { SongRequestItem } from "./components/SongRequestItem";
import { IconButton } from "./components/IconButton";
import { FileExport } from "tabler-icons-react";
import { FileImport } from "tabler-icons-react";
import moment from "moment";
import saveAs from "file-saver";

function App() {
  const [requests, setRequests] = useState<SongRequest[]>([]);

  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.result) {
      const newRequests = JSON.parse(fileReader.result.toString());
      setRequests(newRequests);
    }
  };

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

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      fileReader.readAsText(files[0]);
    }
  };

  const iconText = (
    <div className={styles.iconTextContainer}>
      <FileExport /> <span>Save Requests</span>
    </div>
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Wave's Magic Stream Organizer</h1>

      <button onClick={onAddRequest} className={styles.addButton}>
        Add Request
      </button>
      {requestItems}
      {requests.length > 0 && (
        <button onClick={onAddRequest} className={styles.addButton}>
          Add Request
        </button>
      )}
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
      </div>
    </div>
  );
}

export default App;
