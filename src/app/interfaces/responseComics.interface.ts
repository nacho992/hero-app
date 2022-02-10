export interface ResponseComics {
    code:            string;
    status:          string;
    copyright:       string;
    attributionText: string;
    attributionHTML: string;
    data:            Data;
    etag:            string;
}

interface Data {
    offset:  string;
    limit:   string;
    total:   string;
    count:   string;
    results: Result[];
}

interface Result {
    id:                 string;
    digitalId:          string;
    title:              string;
    issueNumber:        string;
    variantDescription: string;
    description:        string;
    modified:           string;
    isbn:               string;
    upc:                string;
    diamondCode:        string;
    ean:                string;
    issn:               string;
    format:             string;
    pageCount:          string;
    textObjects:        TextObject[];
    resourceURI:        string;
    urls:               URL[];
    series:             Series;
    variants:           Series[];
    collections:        Series[];
    collectedIssues:    Series[];
    dates:              DateElement[];
    prices:             Price[];
    thumbnail:          Thumbnail;
    images:             Thumbnail[];
    creators:           Characters;
    characters:         Characters;
    stories:            Stories;
    events:             Events;
}

interface Characters {
    available:     string;
    returned:      string;
    collectionURI: string;
    items:         CharactersItem[];
}

interface CharactersItem {
    resourceURI: string;
    name:        string;
    role:        string;
}

interface Series {
    resourceURI: string;
    name:        string;
}

interface DateElement {
    type: string;
    date: string;
}

interface Events {
    available:     string;
    returned:      string;
    collectionURI: string;
    items:         Series[];
}

interface Thumbnail {
    path:      string;
    extension: string;
}

interface Price {
    type:  string;
    price: string;
}

interface Stories {
    available:     string;
    returned:      string;
    collectionURI: string;
    items:         StoriesItem[];
}

interface StoriesItem {
    resourceURI: string;
    name:        string;
    type:        string;
}

interface TextObject {
    type:     string;
    language: string;
    text:     string;
}

interface URL {
    type: string;
    url:  string;
}
