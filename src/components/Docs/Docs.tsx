import react, {useState, useEffect} from 'react';
import {Keyword, Headline, Doc} from '../../API';
import classNames from 'classnames';
import styles from './Docs.module.css';
import DocView from './Doc';

type Props = {
    docs: Doc[];
}

function Docs(props: Props){
    const {docs} = props;
    const [searchValue, setSearchValue] = useState("");
    const [filteredDocs, setFilteredDocs] = useState<Doc[]>(docs);
    const [currentPos, setCurrentPos] = useState(0);
    const [currentPosDocs, setCurrentPosDocs] = useState<Doc[]>(docs);
    const [pageTransitAnimation, setPageTranistAnimation] = useState(false);
    const DISPLAYED_DOCS = 8;

    function getDate(){
        var date = new Date();
        var year = date.getFullYear()-1;
        var tempmonth = date.getMonth()+1;
        var month = (tempmonth<10) ? `0${tempmonth}` : tempmonth;
        var day = date.getDate();
        var dateString = (month==2 && day==29) ?  `${year}-${month}-28` : `${year}-${month}-${day}`;
        return dateString;
    }

    function search(doc: Doc, searchKey: string): number {
        const lsk = searchKey.toLowerCase();
        var returnValue = 0;
        if(doc.abstract.toLowerCase().includes(lsk)){
            returnValue += 2;
        }
        if(doc.headline.main.toLowerCase().includes(lsk)){
            returnValue += 3;
        }
        if(doc.lead_paragraph.toLowerCase().includes(lsk)){
            returnValue += 1;
        }
        doc.keywords.map(keyword=>{
            if(keyword.value.toLowerCase().includes(lsk)){
                returnValue += 2;
            }
        })
        return returnValue
    }

    function defaultSearch(){
        setSearchValue('');
        setCurrentPos(0);
    }

    function keywordFilterHandler(e: React.MouseEvent<HTMLButtonElement>){
        var currentKeyword = e.currentTarget.innerHTML;
        currentKeyword = currentKeyword.replace('#', '');
        // const deleteArray = [',','#','(',')','-'];
        // deleteArray.map(deletion=>{
        //     currentKeyword = currentKeyword.replace(deletion, '')
        // })
        setSearchValue(currentKeyword);
    }
    console.log(searchValue);

    useEffect(()=>{
        setFilteredDocs(docs.filter(doc=>{
            return doc.pub_date.includes(getDate())
        }))
    }, []);

    useEffect(()=>{
        setFilteredDocs(docs.filter(doc => {
            return search(doc, searchValue)!=0
        })
        .filter(doc=>{
            return doc.pub_date.includes(getDate())
        })
        .sort(function(doc1, doc2){
            return parseInt(doc1.print_page)-parseInt(doc2.print_page)
        }))
    }, [searchValue]);

    useEffect(()=>{
        setCurrentPosDocs(
            filteredDocs.slice(DISPLAYED_DOCS*currentPos , DISPLAYED_DOCS*(currentPos+1))
        )
        let animationTimer = setTimeout(()=>setPageTranistAnimation(true), 3000);
        return() =>{
            clearTimeout(animationTimer);
        }
    }, [currentPos, filteredDocs]);

    const searchElement = 
    <div className={styles.search}>
        <input 
            type="text" 
            value={searchValue} 
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Searh for Articles"
        />
        {searchValue && <div>Showing {filteredDocs.length} articles</div>}
    </div>

    const buttonElement = 
    <div className={styles.buttons}>
            {currentPos>0 && <div className={styles.prevButton} onClick={()=>setCurrentPos(currentPos-1)}>
                Previous Page
            </div>}
            {currentPos<filteredDocs.length/DISPLAYED_DOCS && <div className={styles.nextButton} onClick={()=>setCurrentPos(currentPos+1)}>
                Next Page
            </div>}
    </div>



    return(
        <div className={styles.docWhole}>
        <div className={styles.newsname} onClick={defaultSearch}>
            Pseudo-New York Times
        </div>
        {searchElement}
        <div className={classNames(styles.doc, pageTransitAnimation && styles.docanimate)}>
                {currentPosDocs.map((doc,i)=>(
                    <DocView 
                        key={i} 
                        doc={doc}
                        callback={keywordFilterHandler}
                    />
                ))}
        </div>
        {buttonElement}
    </div>
    )
}

export default Docs;