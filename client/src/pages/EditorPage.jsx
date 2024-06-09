import { useState } from "react";
import logo from "../assets/code-sync.png";
import Client from "../Components/Client";
import Editor from "../Components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Mridul" },
    { socketId: 2, username: "Mridul Pandey" },
    { socketId: 3, username: "Manu" },
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src={logo} alt="Logo" className="LogoImg" />
          </div>
          <h3>Connected</h3>
          <div className="clientlist">
            {clients.map((client) => (
              <Client username={client.username} key={client.socketId} />
            ))}
          </div>
        </div>

        <button className="btn copyBtn">Copy Room</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorwrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
