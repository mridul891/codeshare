import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useCallback, useEffect, useRef, useState } from "react";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef();
  const [code, setcode] = useState("console.log('hello world!');");

  const onChange = useCallback((value) => {
    console.log("value:", value);
    socketRef.current.emit("code-change", {
      roomId,
      value,
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ value }) => {
        console.log("recievinf", value);
        if (value !== null) {
          setcode(value);
        }
      });
    }
  }, [socketRef.current]);
  return (
    <CodeMirror
      value={code}
      height="100vh"
      className="codemirror"
      theme={dracula}
      autoCorrect="true"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default Editor;
