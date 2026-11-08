Services


GET
/api/Services


Parameters
Cancel
Name	Description
language
string
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/Services' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic'
Request URL
https://realestate22.runasp.net/api/Services
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
      "name": "Swimming Pool",
      "icon": "fa-solid fa-person-swimming"
    },
    {
      "id": 2,
      "name": "Fitness Center",
      "icon": "fa-solid fa-dumbbell"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 12:23:05 GMT 
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
    "name": "string",
    "icon": "string"
  }
]
No links

POST
/api/Services


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "icon": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
0
No links

PUT
/api/Services


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "icon": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
0
No links

GET
/api/Services/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
language
string
(query)
Available values : en, ar, de


--
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
  "name": "string",
  "icon": "string"
}
No links

DELETE
/api/Services/{id}


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
true

InfoAreaPlaces


GET
/api/info-area-places


Parameters
Cancel
Name	Description
Language
string
(query)

--
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/info-area-places' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic'
Request URL
https://realestate22.runasp.net/api/info-area-places
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "dfsgd"
      },
      {
        "id": 2,
        "name": "aaaaaaaaa"
      },
      {
        "id": 3,
        "name": "enen"
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 3,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 12:23:57 GMT 
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
  "items": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links

POST
/api/info-area-places


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "321",
    "ar": "asdf",
    "de": "123asdfasd"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/info-area-places' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "321",
    "ar": "asdf",
    "de": "123asdfasd"
  }
}'
Request URL
https://realestate22.runasp.net/api/info-area-places
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Info area place created successfully.",
  "data": {
    "id": 4,
    "name": "321",
    "names": {
      "en": "321",
      "ar": "asdf",
      "de": "123asdfasd"
    }
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 12:24:06 GMT 
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
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string",
    "names": {
      "en": "string",
      "ar": "string",
      "de": "string"
    }
  },
  "errors": "string"
}
No links

GET
/api/info-area-places/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
4
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate22.runasp.net/api/info-area-places/4' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic'
Request URL
https://realestate22.runasp.net/api/info-area-places/4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 4,
    "name": "321",
    "names": {
      "en": "321",
      "ar": "asdf",
      "de": "123asdfasd"
    }
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 12:24:13 GMT 
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
  "name": "string",
  "names": {
    "en": "string",
    "ar": "string",
    "de": "string"
  }
}
No links

PUT
/api/info-area-places/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Request body

application/json
Example Value
Schema
{
  "id": 0,
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string"
  }
}
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
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string",
    "names": {
      "en": "string",
      "ar": "string",
      "de": "string"
    }
  },
  "errors": "string"
}
No links

DELETE
/api/info-area-places/{id}


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
  "success": true,
  "message": "string",
  "data": true,
  "errors": "string"
}

note that the infoArea is related to rental unit
but the serviers are related to the propiltes but not the project so please note that and create a full plan so that we could add this to the admin UI could you do that ?