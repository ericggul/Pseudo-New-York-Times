import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect,    useHistory, BrowserRouter as Router} from 'react-router-dom';
import { Doc, fetchData} from '../../API';
import Docs from '../Docs/Docs';
import DocView from '../Docs/Doc';
import Loading from '../Loading/Loading'
import styles from './Initial.module.css';

function Initial() {

    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [docs, setDocs] = useState<Doc[]>([]);
    const history = useHistory();

    let button; 
    let loadingjsx;
    let grid;


    const getData = async()=>{
        setLoading(true)
        const getDocs = await fetchData();
        setDocs(getDocs);
        movePage(getDocs);
        setDataLoaded(true)
        setLoading(false)
    }

    const movePage = (docs: [Doc]) =>{
        history.push({
            pathname: '/Docs',
            state: {
                docs: docs
            }
        })
    }



    if(loading){
        loadingjsx = <div className={styles.loading}>
            Loading<span>.</span><span>.</span><span>.</span> Please Wait
        </div>
    }


    if (!dataLoaded){
        button=
        <div className={styles.getData} onClick={getData}>
        {loadingjsx}
        <div className={styles.getDataShape} data-click={loading} />
        </div>
    }


    if(!dataLoaded){
        grid=
        <div className={styles.gridView}>
            {Array(13).fill("").map((a,i)=>(
                <div key={i} color-change={loading}/>
            ))}
        </div>
    }


    return (
        <div className={styles.main}>
        {grid}
            <div className={styles.App}>
                {button}
            </div>
        </div>
    );
}

export default  Initial;