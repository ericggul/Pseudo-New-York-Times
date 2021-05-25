import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';
import {Keyword, Headline, Doc, fetchData} from './API';
import Docs from './components/Docs/Docs';
import DocView from './components/Docs/Doc';
import Loading from './components/Loading/Loading'
import styles from './App.module.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [docs, setDocs] = useState<Doc[]>([]);

  let button; 
  let loadingjsx;
  let grid;

  const getData = async()=>{
    setLoading(true)
    const getDocs = await fetchData();
    setDocs(getDocs);
    setDataLoaded(true)
    setLoading(false)
  }
  if(loading){
    loadingjsx = <div className={styles.loading}>
        Loading<span>.</span><span>.</span><span>.</span> Please Wait
    </div>
  }

  if (!dataLoaded){
    button=<div className={styles.getData} onClick={getData}>{loadingjsx}<div className={styles.getDataShape} data-click={loading}></div><div className={styles.getDataText}><p className={styles.smallText}>Curious what had happened? </p> Get Data</div></div>
  }

  if(!dataLoaded){
    grid=
    <div className={styles.gridView}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  }

  return (

    <div className={styles.main}>
      {grid}
      <div className={styles.App}>
        {button}
        {dataLoaded && 
        <Docs
          docs={docs}
        /> }
      </div>
    </div>
  );
}

export default App;