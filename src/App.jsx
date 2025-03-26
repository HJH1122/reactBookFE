import React from 'react'
import { BrowserRouter, Routes,  Route} from "react-router-dom";



import Book from "./pages/system/Book";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book/>}> 

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
