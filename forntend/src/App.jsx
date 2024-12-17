import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Secure from "./components/Secure";
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secure" element={<Secure />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
