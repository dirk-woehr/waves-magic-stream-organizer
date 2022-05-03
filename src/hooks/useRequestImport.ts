import { SongRequest } from "../interface/SongRequest";

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
      if (append) {
        console.log("append");
        const appendedRequests = [...songRequests, ...newRequests];
        updateRequests(appendedRequests);
      } else {
        console.log("replace");
        updateRequests(newRequests);
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

  return { handleLoad, handleappend };
};
