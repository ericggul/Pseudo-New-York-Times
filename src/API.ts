

export type Headline = {
    main: string;
    print_headline: string;
}

export type Keyword ={
    name: string;
    value: string;
    rank: number;
    major: string;
}

export type Doc ={
    abstract: string;
    document_type: string;
    headline: Headline;
    keywords: Keyword[];
    pub_date: string;
    lead_paragraph: string;
    section_name: string;
    subsection_name: string;
    type_of_material: string;
    word_count: number;
    web_url: string;
    print_page: string;
    print_section: string;
}



export const fetchData = async() =>{

    const endpoint = `http://localhost:5000/getData`;
    const data = await(await fetch(endpoint)).json();
    console.log(data.response.docs);
    return data.response.docs.map((doc: Doc)=>({
        ...doc
    }))
}