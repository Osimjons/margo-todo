export const downloader = (data: string | null) => {
  const obj = JSON.parse(JSON.stringify(data, null, 4));
  const vLink = document.createElement("a");
  const vBlob = new Blob([obj], { type: "octet/stream" });
  const vUrl = window.webkitURL.createObjectURL(vBlob);
  vLink.setAttribute("href", vUrl);

  const name = new Date().toLocaleString();
  vLink.setAttribute("download", "Habit_in_" + name + "-export.json");
  vLink.click();
};

export const uploader = (file: File | undefined, storageKey: string) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      localStorage.setItem(storageKey, content);
      window.location.reload();
    };
    reader.readAsText(file);
  }
};
