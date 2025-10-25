import axios from "axios";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";

function App() {
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [emailList, setEmailList] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef();

  const handleMsg = (e) => setMsg(e.target.value);
  const handleSubject = (e) => setSubject(e.target.value);

  // Handle Excel file
  const processFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawList = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const emails = rawList.map((row) => row[0]).filter(Boolean);
      setEmailList(emails);
    };
    reader.readAsBinaryString(file);
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAttachments = (e) => setAttachments([...e.target.files]);

  const send = async () => {
    if (!subject || !msg || emailList.length === 0) {
      alert("Please enter subject, message, and upload email list.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("msg", msg);
    formData.append("emailList", JSON.stringify(emailList));
    attachments.forEach((file) => formData.append("attachments", file));

    setStatus(true);
    setProgress(0);

    try {
      const res = await axios.post("https://smartmail-automation-system-server.onrender.com/sendemail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
      });
      alert(res.data === true ? "Emails Sent Successfully ✅" : "Failed ❌");
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    } finally {
      setStatus(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex flex-col items-center p-6 text-white">
      {/* Header */}
      <header className="w-full max-w-4xl text-center py-6 text-3xl font-extrabold shadow-xl rounded-lg bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 animate-pulse">
        SmartMail Automation System
      </header>

      {/* Form Card */}
      <div className="bg-gray-900 shadow-2xl rounded-3xl p-8 mt-8 w-full max-w-2xl flex flex-col gap-6 transition-transform transform hover:scale-105 duration-500">
        {/* Subject */}
        <input
          type="text"
          value={subject}
          onChange={handleSubject}
          placeholder="Enter email subject"
          className="w-full p-4 border-2 border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-700 transition duration-300"
        />

        {/* Message */}
        <textarea
          value={msg}
          onChange={handleMsg}
          placeholder="Enter your email message..."
          className="w-full h-40 p-4 border-2 border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-700 transition duration-300 resize-none"
        />

        {/* Drag & Drop Excel */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-blue-700 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-800 transition duration-300"
        >
          <p className="text-gray-300 mb-2">Drag & drop Excel here, or click to select file</p>
          <p className="text-gray-400 text-sm">Only Column A will be read as emails</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-400">Total Emails: {emailList.length}</p>

        {/* Attachments */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-300">Attachments (Optional)</label>
          <input
            type="file"
            multiple
            onChange={handleAttachments}
            className="text-blue-400 cursor-pointer"
          />
          <p className="text-sm text-gray-400">
            {attachments.length > 0
              ? `Attachments: ${attachments.map((f) => f.name).join(", ")}`
              : "No attachments yet"}
          </p>
        </div>

        {/* Progress Bar */}
        {status && (
          <div className="w-full bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={send}
          disabled={status}
          className={`mt-4 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-3 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${
            status ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {status ? "Sending..." : "Send Emails"}
        </button>
      </div>
    </div>
  );
}

export default App;
