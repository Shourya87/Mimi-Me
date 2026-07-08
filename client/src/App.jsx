import axios from 'axios';
import React, { useEffect } from 'react'

export default function App() {

  useEffect(() => {

    axios
    .get("http://localhost:3000/api/test")
    .then((res) => console.log(res.data))
    .catch(console.error);

  },[])

  return (
    <div>
      <h1>Mimi & Me</h1>
    </div>
  )
}
