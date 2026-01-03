import type { Terminal } from "@xterm/xterm";
import type { Ref, RefObject } from "react";

export enum InputType {
  ENTER = "\r",
  DELETE = "\x7f",
  DEFAULT = "default",
}

export type InputHandlerParams = {
  instance: Terminal
  inputBufferRef: RefObject<string>
  data?: string | undefined
}

export type InputHandlerFunction = (params: InputHandlerParams) => void;
