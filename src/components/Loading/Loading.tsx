import react, {useState} from 'react';
import styles from './Loading.module.css';

function Loading() {

    return(
    <div className={styles.loading}>
        Loading<span>.</span><span>.</span><span>.</span> Please Wait
    </div>
    )
}

export default Loading;