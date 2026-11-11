notes that those locations are for the project and primery units and resale units we will use a diffrent endpoint for the other loctions for rental and the units outside could you review this and createa full plan for it 
Locations


GET
/api/categories


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
  'https://realestate44.runasp.net/api/categories' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8'
Request URL
https://realestate44.runasp.net/api/categories
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
        "id": 9,
        "name": "string1",
        "description": "string4",
        "videoUrl": null,
        "images": [
          {
            "id": 8,
            "imageUrl": "images/locations/8863a769-3ae9-4bc4-9274-f47b9da67137.webp",
            "isPrimary": true,
            "sortOrder": 1
          },
          {
            "id": 9,
            "imageUrl": "images/locations/1c0c8916-011d-4f5d-8af9-b1064572cbe9.webp",
            "isPrimary": false,
            "sortOrder": 2
          }
        ]
      },
      {
        "id": 6,
        "name": "Hurghada",
        "description": "A beautiful coastal destination with stunning beaches, crystal-clear waters, and a relaxing atmosphere",
        "videoUrl": null,
        "images": [
          {
            "id": 5,
            "imageUrl": "images/locations/e680df2e-dfec-4370-b839-4121200f8c5d.webp",
            "isPrimary": false,
            "sortOrder": 0
          },
          {
            "id": 6,
            "imageUrl": "images/locations/8d49eded-9724-41ac-a651-b8bce8bddfa7.webp",
            "isPrimary": false,
            "sortOrder": 1
          }
        ]
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 2,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:10:49 GMT 
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
/api/categories


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
string2
Send empty value
Name.De
string
string3
Send empty value
Description.En
string
string4
Send empty value
Description.Ar
string
string5
Send empty value
Description.De
string
string6
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/categories' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name.En=string1' \
  -F 'Name.Ar=string2' \
  -F 'Name.De=string3' \
  -F 'Description.En=string4' \
  -F 'Description.Ar=string5' \
  -F 'Description.De=string6'
Request URL
https://realestate44.runasp.net/api/categories
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location created successfully.",
  "data": 9,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:07:04 GMT 
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
/api/categories/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
9
language
string
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/categories/9' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8'
Request URL
https://realestate44.runasp.net/api/categories/9
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 9,
    "name": "string1",
    "description": "string4",
    "videoUrl": null,
    "images": []
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:07:11 GMT 
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
/api/categories/{id}


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
/api/categories/{id}


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
/api/categories/{id}/images


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
9
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/categories/9/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8'
Request URL
https://realestate44.runasp.net/api/categories/9/images
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
      "id": 8,
      "imageUrl": "images/locations/8863a769-3ae9-4bc4-9274-f47b9da67137.webp",
      "isPrimary": true,
      "sortOrder": 1
    },
    {
      "id": 9,
      "imageUrl": "images/locations/1c0c8916-011d-4f5d-8af9-b1064572cbe9.webp",
      "isPrimary": false,
      "sortOrder": 2
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:09:09 GMT 
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
    "imageUrl": "string",
    "isPrimary": true,
    "sortOrder": 0
  }
]
No links

PUT
/api/categories/{id}/images


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
9
Request body

multipart/form-data
images
array
Neighborhood photograph.png-
homeImage.jpg-
Header and hero.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/categories/9/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8' \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@Neighborhood photograph.png;type=image/png' \
  -F 'images=@homeImage.jpg;type=image/jpeg' \
  -F 'images=@Header and hero.png;type=image/png'
Request URL
https://realestate44.runasp.net/api/categories/9/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location images uploaded successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:08:00 GMT 
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/categories/{id}/images


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
9
imageId
integer($int32)
(query)
7
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/categories/9/images?imageId=7' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8'
Request URL
https://realestate44.runasp.net/api/categories/9/images?imageId=7
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location image deleted successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:08:15 GMT 
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
  "data": true,
  "errors": "string"
}
No links

PUT
/api/categories/{locationId}/images/{imageId}


Parameters
Cancel
Reset
Name	Description
locationId *
integer($int32)
(path)
9
imageId *
integer($int32)
(path)
8
Request body

multipart/form-data
image
string($binary)
Aerial View of a Luxury Villa Resort.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/categories/9/images/8' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@Aerial View of a Luxury Villa Resort.png;type=image/png'
Request URL
https://realestate44.runasp.net/api/categories/9/images/8
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location image replaced successfully.",
  "data": {
    "id": 8,
    "imageUrl": "images/locations/8863a769-3ae9-4bc4-9274-f47b9da67137.webp",
    "isPrimary": true,
    "sortOrder": 1
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:08:49 GMT 
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
    "imageUrl": "string",
    "isPrimary": true,
    "sortOrder": 0
  },
  "errors": "string"
}
No links

PUT
/api/categories/{locationId}/images/{imageId}/primary


Parameters
Cancel
Name	Description
locationId *
integer($int32)
(path)
9
imageId *
integer($int32)
(path)
8
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
  'https://realestate44.runasp.net/api/categories/9/images/8/primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8' \
  -H 'Content-Type: application/json' \
  -d '{
  "isPrimary": true
}'
Request URL
https://realestate44.runasp.net/api/categories/9/images/8/primary
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
 date: Sun,08 Nov 2026 12:10:03 GMT 
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
  "data": true,
  "errors": "string"
}
No links

PUT
/api/categories/{id}/video


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
9
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
  'https://realestate44.runasp.net/api/categories/9/video' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8' \
  -H 'Content-Type: multipart/form-data' \
  -F 'video=@file_example_MP4_480_1_5MG.mp4;type=video/mp4'
Request URL
https://realestate44.runasp.net/api/categories/9/video
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location video updated successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:10:23 GMT 
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/categories/{id}/video


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
9
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate44.runasp.net/api/categories/9/video' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTM5NTk4LCJleHAiOjE3OTQxNDMxOTgsImlhdCI6MTc5NDEzOTU5OCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ehyWbNF0_JzzsqlNbbFsXjvMy2GfDQKfb_ftSzEeGl8'
Request URL
https://realestate44.runasp.net/api/categories/9/video
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Location video deleted successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:10:30 GMT 
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
  "data": true,
  "errors": "string"
}