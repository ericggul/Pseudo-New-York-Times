import react, {useState, useEffect} from 'react';
import {Keyword, Headline, Doc} from '../../API';
import styles from './Dataviz.module.scss';

type Props = {
    docs: Doc[];
}

function Docs(props: Props){
    const {docs} = props;

    return(
        <div>
        Hello World
        </div>
    )
}

export default Docs;