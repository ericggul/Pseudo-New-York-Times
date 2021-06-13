import react, {useState, useEffect} from 'react';
import {Keyword, Headline, Doc} from '../../API';
import styles from './Docs.module.css';

type Props = {
    doc: Doc;
    callback: any;
}


function DocView(props: Props){
    const {doc, callback} = props;

    const reading_speed = Math.floor(doc.word_count/200);

    return (
        <div className={styles.docview}>
        <div className={styles.info}>
            <div className={styles.pubdate}>
                {doc.pub_date.split("T")[0]}
            </div>
            <div className={styles.minread}>
                {`${reading_speed}min read`}
            </div>
        </div>
        <a href={doc.web_url} style={{textDecoration: 'none'}}>
            <div className={styles.headline}>
                {doc.headline.main}
            </div>
        </a>
        <div className={styles.abstract}>
            {doc.abstract}
        </div>
        <div className={styles.keywords}>
            {doc.keywords.map((keyword, i)=>(
                <span className ={styles.keyword} key={i} onClick={callback}>#{keyword.value}</span>
            ))
            }
        </div>
    
        <div className={styles.paragraph}>
            {doc.lead_paragraph}
        </div>
    </div>
    )
}

export default DocView;