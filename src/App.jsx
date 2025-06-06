import { useState } from 'react';

import './App.css';

export default function App() {
  const [isPurple, setIsPurple] = useState('');
  const [textColor, setTextColor] = useState('');
  const [size, setSize] = useState(150);
  const [rotate, setRotate] = useState(0);

  const circleStyle = {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,
    transform: `rotate(${rotate}deg)`,
  };

  return (<>
    <main>
      <label>
        Purple
        <input type="checkbox"
          value={isPurple}
          onChange={() => { setIsPurple(!isPurple) }} />
      </label>

      <label>
        text color
        <select onChange={(e) => { setTextColor(e.target.value); }} value={textColor}>
          <option value="text-white">White</option>
          <option value="text-black">Black</option>
          <option value="text-orange">Orange</option>
        </select>
      </label>

      <label>
        Circle Size
        <input type="number" value={size} onChange={(e) => { setSize(e.target.value); }} />
      </label>

      <label>
        Circle Rotate
        <input type="number" value={rotate} onChange={(e) => { setRotate(e.target.value); }} />
      </label>
      <div className={`circle ${isPurple ? 'purple' : ''} ${textColor}`} style={circleStyle}>Hi!</div>
    </main>
  </>)
}

