import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(9234)

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default App
