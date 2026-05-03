// texteditor.ts
var State = /* @__PURE__ */ (function (State2) {
  State2[(State2["CleanUnsaved"] = 0)] = "CleanUnsaved";
  State2[(State2["CleanSaved"] = 1)] = "CleanSaved";
  State2[(State2["DirtyUnsaved"] = 2)] = "DirtyUnsaved";
  State2[(State2["DirtySaved"] = 3)] = "DirtySaved";
  return State2;
})(State || {});
var textArea = document.getElementById("text");
var state = State.CleanUnsaved;
var openFile = "";
document.addEventListener("DOMContentLoaded", () => {
  showFiles(listFiles(), "files-list");
  textArea.addEventListener("input", () => {
    if (state == State.CleanSaved) {
      state = State.DirtySaved;
      setStateLabel(`${openFile} *`);
    } else if (state == State.CleanUnsaved) {
      state = State.DirtyUnsaved;
      setStateLabel("*");
    }
  });
  const saveAsButton = document.getElementById("save-as-button");
  saveAsButton?.addEventListener("click", () => {
    const content = textArea.value;
    let filename = prompt("Enter a File Name", "");
    if (filename?.trim() != "") {
      if (!filename?.endsWith(".txt")) {
        filename = filename + ".txt";
      }
      localStorage.setItem(filename, content);
      state = State.CleanSaved;
      openFile = filename;
      setStateLabel(filename);
      showFiles(listFiles(), "files-list");
    }
  });
  const saveButton = document.getElementById("save-button");
  saveButton?.addEventListener("click", () => {
    const content = textArea.value;
    if (state == State.CleanSaved || state == State.DirtySaved) {
      localStorage.setItem(openFile, content);
      state = State.CleanSaved;
      setStateLabel(openFile);
      showFiles(listFiles(), "files-list");
    } else {
      let filename = prompt("Enter a File Name", "");
      if (filename?.trim() != "") {
        if (!filename?.endsWith(".txt")) {
          filename = filename + ".txt";
        }
        localStorage.setItem(filename, content);
        state = State.CleanSaved;
        openFile = filename;
        setStateLabel(filename);
        showFiles(listFiles(), "files-list");
      }
    }
  });
  const newButton = document.getElementById("new-button");
  newButton?.addEventListener("click", () => {
    state = State.CleanUnsaved;
    textArea.value = "";
    openFile = "";
    setStateLabel("_");
  });
  document.addEventListener("contextmenu", (event) => {
    alert("Wanna steal my source code, huh!?");
    event.preventDefault();
    return false;
  });
});
function setStateLabel(value) {
  const stateLabel = document.getElementById("state-label");
  if (stateLabel) {
    stateLabel.innerText = value;
  }
}
function showFiles(files, parentId) {
  const parent = document.getElementById(parentId);
  while (parent && parent.hasChildNodes() && parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  for (const file of files) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.innerHTML = file;
    item.appendChild(link);
    parent?.append(item);
    link.addEventListener("click", () => {
      const content = localStorage.getItem(file);
      openFile = file;
      if (textArea != null) {
        textArea.value = content || "";
      }
      state = State.CleanSaved;
      setStateLabel(file);
    });
  }
}
function listFiles() {
  const files = [];
  for (let i = 0; i < localStorage.length; i++) {
    files.push(localStorage.key(i) || "");
  }
  return files;
}
