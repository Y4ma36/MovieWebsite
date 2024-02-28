import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Header from "../src/Common/Header/Header";
import MyList from "./Pages/MyList";
import Movie from "./Pages/Movie";
import Footer from "./Common/Footer/Footer";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />}></Route>
        <Route path="/movie/*" element={<Movie />}></Route>
        <Route path="/tv/*" element={<Tv />}></Route>
        <Route path="/mylist" element={<MyList />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
