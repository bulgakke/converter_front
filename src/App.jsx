import UploadBox from './components/UploadBox'
import './App.css'

function App() {
  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1>SVG → PDF Converter</h1>
      <UploadBox />
    </div>
  )
}

export default App
