'use client'
import dynamic from "next/dynamic";

const MyTerminal = dynamic(() => import("../components/terminal"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <MyTerminal />
    </div>
  );
}
