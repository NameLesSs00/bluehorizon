create a full plan so that we have the controler wokring for the locatoin rent could you creae a full plan for it ?
RentalLocations


GET
/api/rentallocations


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
  'https://realestate44.runasp.net/api/rentallocations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A'
Request URL
https://realestate44.runasp.net/api/rentallocations
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
        "description": "string",
        "videoUrl": null,
        "images": [
          {
            "id": 1,
            "imageUrl": "images/RentalLocations/92ba02d6-fc4b-448f-baee-d0474a047179.webp",
            "isPrimary": false,
            "sortOrder": 0
          }
        ]
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
 date: Wed,11 Nov 2026 16:10:38 GMT 
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
      "description": "string",
      "videoUrl": "string",
      "images": [
        {
          "id": 0,
          "imageUrl": "string",
          "isPrimary": true,
          "sortOrder": 0
        }
      ]
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
/api/rentallocations


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name.En
string
string1
Send empty value
Name.Ar
string
1312
Send empty value
Name.De
string
asdfasd
Send empty value
Description.En
string
123
Send empty value
Description.Ar
string
123123123
Send empty value
Description.De
string
string312312312312
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/rentallocations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name.En=string1' \
  -F 'Name.Ar=1312' \
  -F 'Name.De=asdfasd' \
  -F 'Description.En=123' \
  -F 'Description.Ar=123123123' \
  -F 'Description.De=string312312312312'
Request URL
https://realestate44.runasp.net/api/rentallocations
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "RentalLocation created successfully.",
  "data": 2,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:14:54 GMT 
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
/api/rentallocations/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
language
string
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/rentallocations/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A'
Request URL
https://realestate44.runasp.net/api/rentallocations/2
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
    "name": "string1",
    "description": "123",
    "videoUrl": null,
    "images": []
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:15:04 GMT 
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
  "description": "string",
  "videoUrl": "string",
  "images": [
    {
      "id": 0,
      "imageUrl": "string",
      "isPrimary": true,
      "sortOrder": 0
    }
  ]
}
No links

PUT
/api/rentallocations/{id}


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
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "description": {
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/rentallocations/{id}


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
No links

GET
/api/rentallocations/{id}/images


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
  'https://realestate44.runasp.net/api/rentallocations/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A'
Request URL
https://realestate44.runasp.net/api/rentallocations/2/images
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
      "id": 2,
      "imageUrl": "images/RentalLocations/e46f55de-ff15-493d-bd61-6ddc2fb67245.webp",
      "isPrimary": true,
      "sortOrder": 0
    },
    {
      "id": 3,
      "imageUrl": "images/RentalLocations/ce393295-db86-4eb3-9212-bef200511550.webp",
      "isPrimary": false,
      "sortOrder": 1
    },
    {
      "id": 4,
      "imageUrl": "images/RentalLocations/efcb8454-e721-4164-9b98-ecf5e3438cac.webp",
      "isPrimary": false,
      "sortOrder": 2
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:16:40 GMT 
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
    "imageUrl": "string",
    "isPrimary": true,
    "sortOrder": 0
  }
]
No links

PUT
/api/rentallocations/{id}/images


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
2
Request body

multipart/form-data
images
array
trips.png-
contactUs.png-
contact.webp-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/rentallocations/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A' \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@trips.png;type=image/png' \
  -F 'images=@contactUs.png;type=image/png' \
  -F 'images=@contact.webp;type=image/webp'
Request URL
https://realestate44.runasp.net/api/rentallocations/2/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "RentalLocation images uploaded successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:16:08 GMT 
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/rentallocations/{id}/images


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
imageId
integer($int32)
(query)
imageId
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

PUT
/api/rentallocations/{rentalLocationId}/images/{imageId}/primary


Parameters
Cancel
Name	Description
rentalLocationId *
integer($int32)
(path)
2
imageId *
integer($int32)
(path)
2
Request body

application/json
{
  "isPrimary": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/rentallocations/2/images/2/primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A' \
  -H 'Content-Type: application/json' \
  -d '{
  "isPrimary": true
}'
Request URL
https://realestate44.runasp.net/api/rentallocations/2/images/2/primary
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image set as primary successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:16:52 GMT 
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
  "data": true,
  "errors": "string"
}
No links

PUT
/api/rentallocations/{id}/video


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
2
Request body

multipart/form-data
video
string($binary)
file_example_MP4_480_1_5MG.mp4
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/rentallocations/2/video' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDEzMjE1LCJleHAiOjE3OTQ0MTY4MTUsImlhdCI6MTc5NDQxMzIxNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.L5U3sS1hW6pI4znHKCrsCLVLlswGWBAuwNrrbphZc6A' \
  -H 'Content-Type: multipart/form-data' \
  -F 'video=@file_example_MP4_480_1_5MG.mp4;type=video/mp4'
Request URL
https://realestate44.runasp.net/api/rentallocations/2/video
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "RentalLocation video updated successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,11 Nov 2026 16:17:18 GMT 
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/rentallocations/{id}/video


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