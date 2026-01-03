import { InputType } from "../types/input-handler-types";
import type { Terminal } from "@xterm/xterm";
import type { Ref, RefObject } from "react";
import type { InputHandlerFunction, InputHandlerParams } from "../types/input-handler-types";

const inputTypeHandlers: Record<InputType, InputHandlerFunction> = {
  [InputType.ENTER]: handleEnterKey,
  [InputType.DELETE]: handleDeleteKey,
  [InputType.DEFAULT]: handleDefaultInput,
};

function handleEnterKey(params: InputHandlerParams) {
  const command = params.inputBufferRef.current.trim().toLowerCase();
  params.instance.write("\r\n");

  if (command === "about") {
    params.instance.writeln("hello back");
  } else {
    params.instance.writeln(`unknown command: ${command}`);
  }

  params.inputBufferRef.current = "";
  params.instance.write("$ ");
}

function handleDeleteKey(params: InputHandlerParams) {
  if (params.inputBufferRef.current.length > 0) {
    params.inputBufferRef.current =
      params.inputBufferRef.current.slice(0, -1);
    params.instance.write("\b \b"); // erase char visually
  }
}

function handleDefaultInput(params: InputHandlerParams) {
  if (params.data !== undefined && params.data.length > 0) {
    params.inputBufferRef.current += params.data;
    params.instance.write(params.data); // echo
  }
}

function convertDataToInputType(data: string): InputType {
  const upperData = data.toUpperCase();

  if (Object.values(InputType).includes(upperData as InputType)) {
    return upperData as InputType;
  }

  return InputType.DEFAULT;
}

function handleInput(instance: Terminal, data: string, inputBufferRef: RefObject<string>) {
  const params: InputHandlerParams = { instance, inputBufferRef, data };
  const inputData = convertDataToInputType(data);

  const handler = inputTypeHandlers[inputData] || inputTypeHandlers[InputType.DEFAULT];

  handler(params);
}

export { handleInput };