note that in here we will be doing the following as you can see we have a filed for the icons those icons will be the names of some icons we will be using using the react icons they should be related to the type of the project we should find icons that is realted to that villas homes shales ect we should find a list of icons we can use in our project and we will be using them in the frontend. the backend will only store the icon name could you create a componet so that it will work right please ?

ProjectTypes


GET
/api/project-types


Parameters
Cancel
Name	Description
Language
string
(query)

--
SearchTerm
string
(query)
SearchTerm
SortBy
string
(query)
SortBy
SortDirection
string
(query)
SortDirection
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
  'https://realestate44.runasp.net/api/project-types' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/project-types
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
        "id": 2,
        "name": "Vila",
        "icon": "ReactIconsWillBeUsed"
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:10:14 GMT 
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
      "name": "string",
      "icon": "string"
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
/api/project-types


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "Vila",
    "ar": "vila1",
    "de": "vila2"
  },
  "icon": "ReactIconsWillBeUsed"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/project-types' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "Vila",
    "ar": "vila1",
    "de": "vila2"
  },
  "icon": "ReactIconsWillBeUsed"
}'
Request URL
https://realestate44.runasp.net/api/project-types
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 2,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:10:11 GMT 
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
0
No links

GET
/api/project-types/{id}


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
  'https://realestate44.runasp.net/api/project-types/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/project-types/1
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
    "name": "Vila",
    "icon": "ReactIconsWillBeUsed"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:09:33 GMT 
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
  "icon": "string"
}
No links

PUT
/api/project-types/{id}


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

application/json
{
  "id": 1,
  "name": {
    "en": "Vila",
    "ar": "vila1",
    "de": "vila2"
  },
  "icon": "ReactIconsWillBeUsed"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/project-types/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "name": {
    "en": "Vila",
    "ar": "vila1",
    "de": "vila2"
  },
  "icon": "ReactIconsWillBeUsed"
}'
Request URL
https://realestate44.runasp.net/api/project-types/1
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
 date: Sat,07 Nov 2026 11:09:59 GMT 
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
No links

DELETE
/api/project-types/{id}


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
  'https://realestate44.runasp.net/api/project-types/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/project-types/1
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
 date: Sat,07 Nov 2026 11:10:03 GMT 
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

Facilities


GET
/api/Facilities


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
  'https://realestate44.runasp.net/api/Facilities' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Facilities
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
      "name": "Air Conditioning",
      "icon": null
    },
    {
      "id": 2,
      "name": "Swimming Pool",
      "icon": null
    },
    {
      "id": 3,
      "name": "Gym",
      "icon": null
    },
    {
      "id": 4,
      "name": "Parking",
      "icon": null
    },
    {
      "id": 5,
      "name": "Security",
      "icon": null
    },
    {
      "id": 6,
      "name": "en",
      "icon": "string"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:14:32 GMT 
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
/api/Facilities


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "test1",
    "ar": "test2",
    "de": "stsettring"
  },
  "icon": "Test"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/Facilities' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "test1",
    "ar": "test2",
    "de": "stsettring"
  },
  "icon": "Test"
}'
Request URL
https://realestate44.runasp.net/api/Facilities
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 7,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:14:51 GMT 
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
0
No links

PUT
/api/Facilities


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "id": 7,
  "name": {
    "en": "123",
    "ar": "321",
    "de": "12312312"
  },
  "icon": "Test"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/Facilities' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 7,
  "name": {
    "en": "123",
    "ar": "321",
    "de": "12312312"
  },
  "icon": "Test"
}'
Request URL
https://realestate44.runasp.net/api/Facilities
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 7,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:15:05 GMT 
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
0
No links

GET
/api/Facilities/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
7
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Facilities/7' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Facilities/7
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 7,
    "name": "123",
    "icon": "Test"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:15:14 GMT 
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
  "icon": "string"
}
No links

DELETE
/api/Facilities/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
7
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/Facilities/7' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQ2OTg0LCJleHAiOjE3OTQwNTA1ODQsImlhdCI6MTc5NDA0Njk4NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.8B30KLGQM57fA60wJBdb0U8lhq9cGM4pf2EKyCi1I5g'
Request URL
https://realestate44.runasp.net/api/Facilities/7
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
 date: Sat,07 Nov 2026 11:18:09 GMT 
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

note that in the get facilites by id for not it does not accpet the lanuge flag to view the other lanuges but later the backend team will add it so to save us some time we should create it as if it works so that we could save time when the backend team add it we can just test and conintue 

also name the Facilities to be project Facilities as we will later have things simaler to it okay?
now review all of that and create a plan for it 