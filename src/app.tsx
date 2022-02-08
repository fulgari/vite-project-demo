import { Logo } from './logo'
import { animation } from './three';
import { useEffect } from 'preact/hooks'

export function App() {
  useEffect(() => {
    animation(10)
  }, []);

  return (
    <>
      <Logo />
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
      </p>
    </>
  )
}
