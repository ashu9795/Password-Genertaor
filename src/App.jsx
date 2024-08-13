import { useState, useCallback,useEffect,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [addNumber, setAddNumber] = useState(false);
  const [addChar, setAddChar] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (addNumber) str += "0123456789";
    if (addChar) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, addNumber, addChar]);

  // Generate password initially or when dependencies change
 useEffect(()=>{
    passwordGen();
 }, [passwordGen, length, addNumber, addChar]);
 const copyPassword = useCallback(() => {
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0, 30);
  window.navigator.clipboard.writeText(password);
 },[password])
  return (
    <> 
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8  text-black">
        <h1 className='text-white text-center mb-4 font-bold shadow-lg' >Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-3 text-black'
            placeholder='Password'
            readOnly
            ref={inputRef}
          />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min = {4}
            max = {35}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
             /> <label>Length : {length}</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {addNumber}
            id = "numberInput"
            onChange={()=>{
              setAddNumber((prev) =>!prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-centre gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {addChar}
            id = "charInput"
            onChange={()=>{
              setAddChar((prev) =>!prev);
            }}
            />
            <label htmlFor="charInput">Characters</label>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
