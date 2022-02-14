export interface ResponseCharacters {
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
    total:   number;
    count:   string;
    results: Result[];
}

interface Result {
    id:          string;
    name:        string;
    description: string;
    modified:    string;
    resourceURI: string;
    urls:        URL[];
    thumbnail:   Thumbnail;
    comics:      Comics;
    stories:     Stories;
    events:      Comics;
    series:      Comics;
}

interface Comics {
    available:     string;
    returned:      string;
    collectionURI: string;
    items:         ComicsItem[];
}

interface ComicsItem {
    resourceURI: string;
    name:        string;
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

interface Thumbnail {
    path:      string;
    extension: string;
}

interface URL {
    type: string;
    url:  string;
}
