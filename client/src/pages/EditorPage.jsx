import { useEffect, useRef, useState } from "react";
import logo from "../assets/code-sync.png";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import { initSocket } from "../socket";
import { ACTIONS } from "../../Actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  // states
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();

  // functions
  const handleErrors = (e) => {
    console.log("socket error", e);
    toast.error("Socket connection failed , try again later.");
    navigate("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failes", (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          setClients(clients)
        }
      );
    };

    init();
  }, []);

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
