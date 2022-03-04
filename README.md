# THA : The-Home-of-Tathagata 如來之家

訪談業主需求，規劃網站整體架構，完成前後端程式開發，

其網站主要功能包含：即時新聞公告、圖片輪播、相簿、跑馬燈與後台管理系統。


## Setup
### Backend

設定 .env 中的變數

### Frontend

設定 /src/models/tool.js 中的 S3_URI 與 SERVER_URL

## Usage


### Frontend


``` 
$ cd Frontend
$ npm run build
```

將做成的 build 資料夾移入 Backend 中


### Backend

```
$ mv ../Frontend/build .
$ npm start
```

將前端編譯完成的 build 資料夾移入，連到 http://127.0.0.1:3000 即可瀏覽網站