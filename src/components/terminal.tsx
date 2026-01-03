"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useXTerm, UseXTermProps } from "react-xtermjs";
import type { Terminal } from "@xterm/xterm";
import { initTermProps, terminalStyles } from "../utils/constants";
import { handleInput } from "../utils/inputHandler";

export default function MyTerminal() {
  const [userWelcomed, setUserWelcomed] = useState(false)
  const inputBufferRef = useRef(""); const termProps = useMemo(
    (): UseXTermProps => (initTermProps), []
  );

  const { instance, ref } = useXTerm(termProps);

  const writeWelcomeMessage = (instance: Terminal) => {
    const welcomeMsg: string = `Hello welcome to the showcase`

    instance.writeln(welcomeMsg);
    setUserWelcomed(true)
  }

  useEffect(() => {
    if (!instance) return;

    if (!userWelcomed) writeWelcomeMessage(instance)

    instance.write("$ ");

    const d = instance.onData((data) => {
      handleInput(instance, data, inputBufferRef)
    });

    return () => d.dispose();
  }, [instance]);

  return <div ref={ref} style={terminalStyles} />;
}
