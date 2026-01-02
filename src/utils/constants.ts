import { UseXTermProps } from "react-xtermjs";

const initTermProps: UseXTermProps = {
  options: {
    cursorBlink: true,
    cursorStyle: "block",
    allowTransparency: true,

    // Nerd font (make sure you actually load it via @font-face or it will fallback)
    fontFamily: '"MesloLGS Nerd Font Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: 0,

    scrollback: 3000,
    convertEol: true,

    theme: {
      // Transparent terminal background (container provides the real tinted black)
      background: "rgba(0,0,0,0)",
      foreground: "#E8DCC7",
      cursor: "#E8DCC7",
      cursorAccent: "rgba(0,0,0,0)",
      // selection: "rgba(232, 220, 199, 0.22)",

      // “Old-world” warm ANSI palette (earthy, parchment, brass, oxblood)
      black: "#1A1512",
      red: "#B04B3D",
      green: "#7D8C5B",
      yellow: "#C6A15B",
      blue: "#5B7A87",
      magenta: "#8B6B88",
      cyan: "#6C8C7E",
      white: "#E8DCC7",

      brightBlack: "#3A2F29",
      brightRed: "#D06A5A",
      brightGreen: "#97A86C",
      brightYellow: "#E0C07A",
      brightBlue: "#6F97A6",
      brightMagenta: "#A982A6",
      brightCyan: "#86B09D",
      brightWhite: "#FFF4DE",
    },
  },
};

const terminalStyles: React.CSSProperties = {
  width: "100%",
  height: 400,
  minHeight: 300,
  maxWidth: 800,
  padding: 15,

  margin: "0 auto",

  borderRadius: 12,
  overflow: "hidden",

  // The “real” background + transparency feel lives on the container
  backgroundColor: "rgba(0, 0, 0, 0.72)",
  backdropFilter: "blur(8px)",

  border: "1px solid rgba(255, 255, 255, 0.10)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
};

export { terminalStyles, initTermProps };
