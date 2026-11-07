those are both of the endpoitns for the FAQ and the site links or the keyValues

okay note that the get keyvalue by id is note useful now and we will not use it 
and the the admin UI we will have the side bar on the left and in it we will have a page for each controler and note that there will not be any header could you create a full plan so that we could add those to the app ? 

Questions


GET
/api/Questions


Parameters
Cancel
Name	Description
language
string
(query)

ar
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/Questions?language=ar' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw'
Request URL
https://realestate22.runasp.net/api/Questions?language=ar
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": [
    {
      "id": 1,
      "title": "stringar1",
      "description": "stringar1",
      "createdAt": "2026-11-07T09:50:39.4674362"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:51:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "title": "string",
    "description": "string",
    "createdAt": "2026-11-07T09:52:00.920Z"
  }
]
No links

POST
/api/Questions


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": {
    "en": "stringen",
    "ar": "stringar",
    "de": "stringde"
  },
  "description": {
    "en": "stringen",
    "ar": "stringar",
    "de": "stringde"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Questions' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "stringen",
    "ar": "stringar",
    "de": "stringde"
  },
  "description": {
    "en": "stringen",
    "ar": "stringar",
    "de": "stringde"
  }
}'
Request URL
https://realestate22.runasp.net/api/Questions
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "title": "stringen",
    "description": "stringen",
    "createdAt": "2026-11-07T09:50:39.4674362Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:50:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "title": "string",
  "description": "string",
  "createdAt": "2026-11-07T09:52:00.923Z"
}
No links

PUT
/api/Questions


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "id": 1,
  "title": {
    "en": "stringen1",
    "ar": "stringar1",
    "de": "stringde1"
  },
  "description": {
    "en": "stringen1",
    "ar": "stringar1",
    "de": "stringde1"
  }
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate22.runasp.net/api/Questions' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "title": {
    "en": "stringen1",
    "ar": "stringar1",
    "de": "stringde1"
  },
  "description": {
    "en": "stringen1",
    "ar": "stringar1",
    "de": "stringde1"
  }
}'
Request URL
https://realestate22.runasp.net/api/Questions
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "title": "stringen1",
    "description": "stringen1",
    "createdAt": "2026-11-07T09:50:39.4674362"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:51:50 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "title": "string",
  "description": "string",
  "createdAt": "2026-11-07T09:52:00.925Z"
}
No links

GET
/api/Questions/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "title": "string",
  "description": "string",
  "createdAt": "2026-11-07T09:52:00.928Z"
}
No links

DELETE
/api/Questions/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate22.runasp.net/api/Questions/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw'
Request URL
https://realestate22.runasp.net/api/Questions/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:51:59 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
true
KeyValues


GET
/api/KeyValues


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/KeyValues' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw'
Request URL
https://realestate22.runasp.net/api/KeyValues
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": [
    {
      "id": 1,
      "key": "FaceBook",
      "value": "https://www.facebook.com/"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:54:03 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "key": "string",
    "value": "string"
  }
]
No links

POST
/api/KeyValues


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "key": "facebook",
  "value": "https://www.facebook.com/"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/KeyValues' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw' \
  -H 'Content-Type: application/json' \
  -d '{
  "key": "facebook",
  "value": "https://www.facebook.com/"
}'
Request URL
https://realestate22.runasp.net/api/KeyValues
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "key": "facebook",
    "value": "https://www.facebook.com/"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:53:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "key": "string",
  "value": "string"
}
No links

PUT
/api/KeyValues


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "id": 1,
  "key": "FaceBook",
  "value": "https://www.facebook.com/"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate22.runasp.net/api/KeyValues' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "key": "FaceBook",
  "value": "https://www.facebook.com/"
}'
Request URL
https://realestate22.runasp.net/api/KeyValues
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "key": "FaceBook",
    "value": "https://www.facebook.com/"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:53:50 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "key": "string",
  "value": "string"
}
No links

GET
/api/KeyValues/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/KeyValues/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw'
Request URL
https://realestate22.runasp.net/api/KeyValues/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "key": "FaceBook",
    "value": "https://www.facebook.com/"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:53:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "key": "string",
  "value": "string"
}
No links

DELETE
/api/KeyValues/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate22.runasp.net/api/KeyValues/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw'
Request URL
https://realestate22.runasp.net/api/KeyValues/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:54:10 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
true