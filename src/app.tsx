import { Logo } from "./logo";
import { animation } from "./three";
import { useEffect } from "preact/hooks";
import { LoveScene } from "./three_lovescene";

export function App() {
  useEffect(() => {
    // animation(60)
    new LoveScene();
  }, []);

  return (
    <>
      {/* <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          class="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p> */}
    </>
  );
}
