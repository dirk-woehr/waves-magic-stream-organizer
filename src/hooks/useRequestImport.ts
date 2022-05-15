import { SongRequest } from "../interface/SongRequest";
import { v4 as uuidv4 } from "uuid";

interface UseSongRequests {
  handleLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleappend: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useRequestImports = (
  songRequests: SongRequest[],
  updateRequests: (songRequests: SongRequest[]) => void
): UseSongRequests => {
  const handleAddRequestsFromFile = (
    result: string | ArrayBuffer | null,
    append: boolean
  ) => {
    if (result) {
      const newRequests: SongRequest[] = JSON.parse(result.toString());
      for (let i = 0; i < newRequests.length; i++) {
        if (newRequests[i].id === undefined) {
          newRequests[i].id = uuidv4();
        }
        console.log(newRequests);
      }
      if (append) {
        const appendedRequests = [...songRequests, ...newRequests];
        updateRequests(appendedRequests);
      } else {
        updateRequests(newRequests);
      }
    }
  };

  const fileReaderReplace = new FileReader();
  fileReaderReplace.onload = () => {
    handleAddRequestsFromFile(fileReaderReplace.result, false);
  };

  const fileReaderAppend = new FileReader();
  fileReaderAppend.onload = () => {
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

  return { handleLoad, handleappend };
};
