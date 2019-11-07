import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import AddBuildingComp from './components/AddBuildingComp/addBuildingComp'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <AddBuildingComp></AddBuildingComp>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
