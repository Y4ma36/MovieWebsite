import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Header from "./Components/Header/Header";
import MyList from "./Pages/MyList";
import Movie from "./Pages/Movie";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/*" element={<Movie />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/mylist" element={<MyList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
