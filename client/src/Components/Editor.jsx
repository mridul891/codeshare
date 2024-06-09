import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const Editor = () => {
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="100vh"
      className="codemirror"
      theme={dracula}
      autoCorrect="true"
      extensions={[javascript({ jsx: true })]}
    />
  );
};

export default Editor;
