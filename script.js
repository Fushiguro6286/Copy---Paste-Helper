const box = document.getElementById("box");
const status = document.getElementById("status");

function showStatus(msg, type) {
    status.textContent = msg;
    status.className = type;
    status.style.visibility = "visible";
    setTimeout(() => status.style.visibility = "hidden", 1500);
}

document.getElementById("copyBtn").onclick = async () => {
    try {
        await navigator.clipboard.writeText(box.value);
        showStatus("Copied!", "success");
    } catch {
        showStatus("Copy failed!", "error");
    }
};

document.getElementById("copySelBtn").onclick = async () => {
    const selected = box.value.substring(box.selectionStart, box.selectionEnd);
    if (!selected) return showStatus("No text selected!", "error");

    try {
        await navigator.clipboard.writeText(selected);
        showStatus("Selected text copied!", "success");
    } catch {
        showStatus("Copy failed!", "error");
    }
};

document.getElementById("pasteBtn").onclick = async () => {
    try {
        const text = await navigator.clipboard.readText();
        box.value = text;
        showStatus("Pasted!", "success");
    } catch {
        showStatus("Paste blocked!", "error");
    }
};

document.getElementById("clearBtn").onclick = () => {
    box.value = "";
    showStatus("Cleared!", "success");
};

document.getElementById("downloadBtn").onclick = () => {
    const blob = new Blob([box.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "note.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showStatus("Downloaded!", "success");
};

document.getElementById("toggleDark").onclick = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
};