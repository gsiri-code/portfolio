"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useXTerm, UseXTermProps } from "react-xtermjs";
import type { Terminal } from "@xterm/xterm";
import { initTermProps, terminalStyles } from "../utils/constants";

export default function MyTerminal() {


  const [userWelcomed, setUserWelcomed] = useState(false)
  const inputBufferRef = useRef("");
  const termProps = useMemo(
    (): UseXTermProps => (initTermProps), []
  );

  const { instance, ref } = useXTerm(termProps);

  const writeWelcomeMessage = (instance: Terminal) => {
    const welcomeMsg: string = `
[38;2;255;180;120m█[38;2;240;165;110m█[38;2;225;150;100m█[38;2;210;135;90m█[38;2;195;120;80m█[38;2;180;105;70m█[38;2;165;90;60m█[38;2;150;75;50m█[0m
`

    instance.writeln(welcomeMsg);
    setUserWelcomed(true)
  }

  useEffect(() => {
    if (!instance) return;

    if (!userWelcomed) writeWelcomeMessage(instance)

    instance.write("$ ");

    const d = instance.onData((data) => {
      switch (data) {
        case "\r": { // ENTER
          const command = inputBufferRef.current.trim().toLowerCase();
          instance.write("\r\n");

          if (command === "about") {
            instance.writeln("hello back");
          } else {
            instance.writeln(`unknown command: ${command}`);
          }

          inputBufferRef.current = "";
          instance.write("$ ");
          break;
        }

        case "\x7f": { // BACKSPACE
          if (inputBufferRef.current.length > 0) {
            inputBufferRef.current =
              inputBufferRef.current.slice(0, -1);
            instance.write("\b \b"); // erase char visually
          }
          break;
        }

        default: {
          inputBufferRef.current += data;
          instance.write(data); // echo
        }
      }
    });

    return () => d.dispose();
  }, [instance]);

  return <div ref={ref} style={terminalStyles} />;
}
