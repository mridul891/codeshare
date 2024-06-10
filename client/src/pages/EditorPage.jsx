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

  // copy room id
  const copyroomid = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room id  has been copied to your clipboard");
    } catch (error) {
      toast.error("Could not copy the room id");
      console.log(error);
    }
  };

  // leave room
  const leaveRoom = async () => {
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

      // listing for all the users that joined
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          setClients(clients);
        }
      );

      // Listening for disconnected users
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room `);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();
    // every listener need to closed as it use the memory at the maximum stage
    return () => {
      socketRef.current.off("join");
      socketRef.current.off("joined");
      socketRef.current.off("disconnect");
      socketRef.current.disconnect();
    };
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

        <button className="btn copyBtn" onClick={copyroomid}>
          Copy Room
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorwrap">
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
