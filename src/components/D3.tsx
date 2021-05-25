import react from 'react';
import {Keyword, Headline, Doc} from '../API';


type Props = {
    docs: Doc[];
}

const Dthree: React.FC<Props> = ({
    docs
}) => (
    <div className="doc">
        <h1 className="keywords">
            Hello WOrld            
        </h1>
    </div>
)

export default Dthree;