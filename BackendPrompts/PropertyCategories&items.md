now we should create a plan for those note that i haven't tested evetyhing so that i'll do that in the UI but note that there is no langue dropdown in the get by id that is why we should send the Accept-Language header so that we get the other things note that it's better to do both call the header and also the dropdown optoin but in this case it will work with the Accept-Language herader okay ? could you create a plan so that we could add those to the project ?
note that those will be realted to the Rental units that we will be ading later okay ? create a full plan to add both of those 
PropertyCategories


GET
/api/property-categories


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
  'https://realestate44.runasp.net/api/property-categories?Language=ar' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic'
Request URL
https://realestate44.runasp.net/api/property-categories?Language=ar
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
        "name": "string",
        "icon": "string",
        "displayOrder": 1
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
 date: Sat,07 Nov 2026 11:42:47 GMT 
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
      "icon": "string",
      "displayOrder": 0
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
/api/property-categories


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "321",
    "ar": "fasdf",
    "de": "123asdfsd"
  },
  "icon": "12312",
  "displayOrder": 2
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/property-categories' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "321",
    "ar": "fasdf",
    "de": "123asdfsd"
  },
  "icon": "12312",
  "displayOrder": 2
}'
Request URL
https://realestate44.runasp.net/api/property-categories
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Property category created successfully.",
  "data": 2,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:43:04 GMT 
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
  "data": 0,
  "errors": "string"
}
No links

GET
/api/property-categories/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/property-categories/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDUxNjM0LCJleHAiOjE3OTQwNTUyMzQsImlhdCI6MTc5NDA1MTYzNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.4s2zEdRxTl3Q1_fR9lLUmK-ptCp7AJmXjkQJrU-wmic'
Request URL
https://realestate44.runasp.net/api/property-categories/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 2,
    "name": "321",
    "icon": "12312",
    "displayOrder": 2
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 11:45:32 GMT 
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
  "icon": "string",
  "displayOrder": 0
}
No links

PUT
/api/property-categories/{id}


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
  },
  "icon": "string",
  "displayOrder": 0
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/property-categories/{id}


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