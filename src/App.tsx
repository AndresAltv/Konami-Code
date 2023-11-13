import { useEffect, useId, useState } from 'react'
import { ChevronLeftSquare, ChevronRightSquare, ChevronUpSquare, ChevronDownSquare } from 'lucide-react';

export const App: React.FC = () => {

  const konami: string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]
  const id = useId();

  const [codeInput, setCodeInput] = useState<string[]>([]);
  const [inputOk, setInputOk] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(0);
  const [win, setWin] = useState<boolean>(false);


  useEffect(() => {
    addEventListener('keydown', handleKeyPressed);
    return () => {
      removeEventListener('keydown', handleKeyPressed);
    }
  }, []);



  useEffect(() => {

    if (codeInput.length !== 0) {
      if (codeInput[position] === konami[position]) {
        setPosition(position + 1);
      } else {
        setPosition(0);
        setCodeInput([]);
        setInputOk(false);
      }
    }

    if (codeInput.length === 10) { setWin(true) }

  }, [codeInput]);

  const handleKeyPressed = (e: KeyboardEvent): void => {
    if (inputOk) {
      setCodeInput((prev) => [...prev, e.key]);
    }
  }

  const handleReset = () => {
    setPosition(0);
    setCodeInput([]);
    setInputOk(true);
    setWin(false)
  }

  return (
    <div id="konami">
      <h1>Konami Code</h1>
      <p id="code">
        {
          codeInput.map((key, index): any => {
            switch (key) {
              case 'ArrowUp':
                return <ChevronUpSquare key={id + index} />
              case 'ArrowDown':
                return <ChevronDownSquare key={id + index} />
              case 'ArrowLeft':
                return <ChevronLeftSquare key={id + index} />
              case 'ArrowRight':
                return <ChevronRightSquare key={id + index} />
              case 'b':
                return <span key={id + index}>B</span>
              case 'a':
                return <span key={id + index}>A</span>
              default:
                return;
            }
          })
        }
      </p>
      {

        !inputOk &&
        <>
          <p>You have entered the wrong code</p>
          <button onClick={handleReset}>Try again</button>
        </>
      }

      {
        win &&
        <>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/MkSYX0N07CQ?si=ohSWIVnkXmMJP7Dq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
          <br /><button onClick={handleReset}>Try again</button>
        </>
      }

    </div>
  );
}

export default App