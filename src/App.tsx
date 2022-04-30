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

function App() {
  const [requests, setRequests] = useState<SongRequest[]>([]);

  const handleAddRequestsFromFile = (
    result: string | ArrayBuffer | null,
    append: boolean
  ) => {
    if (result) {
      const newRequests: SongRequest[] = JSON.parse(result.toString());
      if (append) {
        console.log("append");
        const appendedRequests = [...requests, ...newRequests];
        setRequests(appendedRequests);
      } else {
        console.log("replace");
        setRequests(newRequests);
      }
    }
  };

  const fileReaderReplace = new FileReader();
  fileReaderReplace.onload = () => {
    console.log("file reader replace");
    handleAddRequestsFromFile(fileReaderReplace.result, false);
  };

  const fileReaderAppend = new FileReader();
  fileReaderAppend.onload = () => {
    console.log("file reader append");
    handleAddRequestsFromFile(fileReaderAppend.result, true);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      fileReaderReplace.readAsText(files[0]);
    }
  };

  const handleappend = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      fileReaderAppend.readAsText(files[0]);
    }
  };

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
    </div>
  );
}

export default App;
