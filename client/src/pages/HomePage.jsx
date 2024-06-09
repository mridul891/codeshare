import { useState } from "react";
import logo from "../assets/code-sync.png";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [roomid, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new Room");
  };

  // creation of room

  const joinRoom = () => {
    if (!roomid || !username) {
      toast.error("Room ID & username is required");
      return;
    }

    // Redirect To the Websocket Page
    navigate(`editor/${roomid}`, { state: { username } });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homewrapper">
      <div className="formwrapper">
        {/* logo */}
        <img src={logo} alt="code-sync-logo" />
        <h3 className="mainLabel">Paste Invitation Room Id</h3>
        {/* input Elements */}
        <div className="inputGroup">
          {/* Inputs and Join Button */}
          <input
            type="text"
            className="inputBox"
            placeholder="ROOMID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomid}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>

          {/* Additional Information */}
          <span className="createInfo">
            If you Don&apos;t have an invite then create &nbsp;
            <a href="" onClick={createNewRoom} className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Built with 💛&nbsp; by <a href="">Mridul Pandey</a>
        </h4>
      </footer>
    </div>
  );
};

export default HomePage;
