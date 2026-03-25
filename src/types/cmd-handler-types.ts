
import type { Terminal } from "@xterm/xterm";

export enum CmdTypes {
  ABOUT = "abt",
  EXP = "exp",
  PROJS = "projs",
  INSP = "insp",
}

export type CmdHandlerFunction = (instance: Terminal) => void;
