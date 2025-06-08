import './App.css'
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  return (
      <>
        <Navbar exercisesLink="/html/exercises.html" workoutsLink="/html/workouts.html"/>
        <Footer />
      </>
  )
}

export default App
