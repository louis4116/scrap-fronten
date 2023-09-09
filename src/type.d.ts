//----------------API------------------//
interface NewsShape {
  source: string;
  title: string;
  date: string;
  url: string;
  img?: string;
  summary?: string;
}




////----------------COMPONENT------------------//

//NewsItem
interface NewsItem {
    source: string;
    title: string;
    date: string;
    url: string;
    img?: string;
    summary?: string;
}


//----------------STORE------------------//

//authStore  
interface User {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
    news?: [];
}

interface AuthState{
    status: string;
    token: string;
    id: string;
}

interface DATAPROPS {
    _id: string;
    date: string;
    img: string;
    source: string;
    storedDate: string;
    title: string;
    url: string;
    memo: string;
    user: string;
 }


