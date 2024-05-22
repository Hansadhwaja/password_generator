import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(4);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (character) str += '~!@#$%^&*(){}?[]_'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor((Math.random() * str.length));
      pass += str[char];

    }
    setPassword(pass);

  }, [length, number, character, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])


  return (
    <div className="w-full max-w-lg bg-gray-700 text-white  mx-auto mt-12 p-5 rounded-xl">
      <h1 className="font-bold text-3xl">Password Generator</h1>
      <div className="flex flex-wrap mt-3">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="w-3/4 rounded-l-lg p-2 text-slate-600 border-none"
        />
        <button 
        onClick={copyPassword}
        className="bg-blue-700 p-3 rounded-r-lg hover:bg-blue-400 outline-4">Copy</button>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        <div className="flex gap-2">
          <input
            type="range"
            min={4}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value={number}
            className="cursor-pointer"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value={character}
            className="cursor-pointer"
            onChange={() => setCharacter((prev) => !prev)}
          />
          <label>Characters</label>
        </div>

      </div>
    </div>
  )
}

export default App
