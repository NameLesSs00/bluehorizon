note that 

public enum PropertyType
{
    Apartment,
    Villa,
    Townhouse,
    Studio,
    Penthouse
        ,onebedroom,twobedroon,threebedroom,chalet,fourbedroom,studio,
} [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

could you create a full plan so that we have the props for the reslae works right just like the rent props create a plan for it please 


Resale


GET
/api/resales


Parameters
Cancel
Name	Description
Language
string
(query)

--
Currency
string
(query)

--
SearchTerm
string
(query)
SearchTerm
Search
string
(query)
Search
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
PropertyType
string
(query)
PropertyType
ProjectId
integer($int32)
(query)
ProjectId
IsFeatured
boolean
(query)

--
IsActive
boolean
(query)

--
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
  'https://realestate44.runasp.net/api/resales' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM'
Request URL
https://realestate44.runasp.net/api/resales
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
        "markerId": "962095",
        "name": "Azure Skyline Penthouse Suite",
        "description": "An exclusive penthouse featuring panoramic sea views, contemporary open-plan living, private rooftop terrace, and high-end Italian finishes.",
        "area": 240,
        "noBathRoom": 3,
        "noBedRoom": 3,
        "noKitchen": 1,
        "floorName": "Top Floor / Penthouse",
        "floorNumber": 12,
        "view": "Panoramic Sea and Marina View",
        "propertyType": "Studio",
        "isFeatured": true,
        "isActive": true,
        "projectName": "Palm Hills",
        "project": {
          "id": 1,
          "name": "Palm Hills",
          "description": "Luxury complex"
        },
        "prices": [
          {
            "id": 5,
            "currency": "USD",
            "price": 450000
          }
        ],
        "imageUrls": [
          "images/resales/87f4076a-79b0-4640-a05e-fc3c80a86ec9.webp",
          "images/resales/2e35c5c8-12da-496a-b12f-221642600e23.webp",
          "images/resales/e5b1b53b-ec8e-4ea0-b569-4b4945180d8c.webp"
        ],
        "services": [
          {
            "id": 1,
            "name": "stringgsdfg",
            "icon": "MdLocalParking"
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-12T10:48:37.5586644",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "markerId": "533821",
        "name": "Premium Two-Bedroom Resale Apartment",
        "description": "A well-maintained apartment available for resale, featuring modern finishing, spacious rooms, and attractive views. Ideal for residential living or investment.",
        "area": 110,
        "noBathRoom": 2,
        "noBedRoom": 2,
        "noKitchen": 1,
        "floorName": "Second Floor",
        "floorNumber": 2,
        "view": "Pool View",
        "propertyType": "Villa",
        "isFeatured": true,
        "isActive": true,
        "projectName": "Palm Residence",
        "project": {
          "id": 3,
          "name": "Palm Residence",
          "description": "A modern residential project offering comfortable apartments with premium facilities and convenient access to essential services."
        },
        "prices": [
          {
            "id": 1,
            "currency": "USD",
            "price": 125000
          }
        ],
        "imageUrls": [],
        "services": [
          {
            "id": 1,
            "name": "stringgsdfg",
            "icon": "MdLocalParking"
          }
        ],
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-10T14:18:59.8107507",
        "updatedBy": null,
        "updatedAt": null
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
 date: Thu,12 Nov 2026 10:52:01 GMT 
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
      "markerId": "string",
      "name": "string",
      "description": "string",
      "area": 0,
      "noBathRoom": 0,
      "noBedRoom": 0,
      "noKitchen": 0,
      "floorName": "string",
      "floorNumber": 0,
      "view": "string",
      "propertyType": "string",
      "isFeatured": true,
      "isActive": true,
      "projectName": "string",
      "project": {
        "id": 0,
        "name": "string",
        "description": "string"
      },
      "prices": [
        {
          "id": 0,
          "currency": "string",
          "price": 0
        }
      ],
      "imageUrls": [
        "string"
      ],
      "services": [
        {
          "id": 0,
          "name": "string",
          "icon": "string"
        }
      ],
      "createdBy": "string",
      "createdAt": "2026-11-12T10:52:02.330Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-12T10:52:02.330Z"
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
/api/resales


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "projectId": 1,
  "name": {
    "en": "Azure Skyline Penthouse Suite",
    "ar": "جناح بنتهاوس أزور سكايلاين",
    "de": "Azure Skyline Penthouse-Suite"
  },
  "description": {
    "en": "An exclusive penthouse featuring panoramic sea views, contemporary open-plan living, private rooftop terrace, and high-end Italian finishes.",
    "ar": "بنتهاوس حصري يتميز بإطلالات بانورامية على البحر، وتصميم عصري مفتوح، وتراس خاص على السطح، وتشطيبات إيطالية راقية.",
    "de": "Ein exklusives Penthouse mit Panoramablick auf das Meer, zeitdgemäßem Open-Plan-Wohnen, privater Dachterrasse und hochwertiger italienischer Ausstattung."
  },
  "view": {
    "en": "Panoramic Sea and Marina View",
    "ar": "إطلالة بانورامية على البحر والمارينا",
    "de": "Panoramablick auf das Meer und die Marina"
  },
  "propertyType": 3,
  "noBathRoom": 3,
  "noBedRoom": 3,
  "noKitchen": 1,
  "floorNumber": 12,
  "area": 240,
  "floorName": {
    "en": "Top Floor / Penthouse",
    "ar": "الطابق الأخير / بنتهاوس",
    "de": "Oberstes Stockwerk / Penthouse"
  },
  "isFeatured": true,
  "serviceIds": [
    1
  ],
  "priceUSD": 450000
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/resales' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM' \
  -H 'Content-Type: application/json' \
  -d '{
  "projectId": 1,
  "name": {
    "en": "Azure Skyline Penthouse Suite",
    "ar": "جناح بنتهاوس أزور سكايلاين",
    "de": "Azure Skyline Penthouse-Suite"
  },
  "description": {
    "en": "An exclusive penthouse featuring panoramic sea views, contemporary open-plan living, private rooftop terrace, and high-end Italian finishes.",
    "ar": "بنتهاوس حصري يتميز بإطلالات بانورامية على البحر، وتصميم عصري مفتوح، وتراس خاص على السطح، وتشطيبات إيطالية راقية.",
    "de": "Ein exklusives Penthouse mit Panoramablick auf das Meer, zeitdgemäßem Open-Plan-Wohnen, privater Dachterrasse und hochwertiger italienischer Ausstattung."
  },
  "view": {
    "en": "Panoramic Sea and Marina View",
    "ar": "إطلالة بانورامية على البحر والمارينا",
    "de": "Panoramablick auf das Meer und die Marina"
  },
  "propertyType": 3,
  "noBathRoom": 3,
  "noBedRoom": 3,
  "noKitchen": 1,
  "floorNumber": 12,
  "area": 240,
  "floorName": {
    "en": "Top Floor / Penthouse",
    "ar": "الطابق الأخير / بنتهاوس",
    "de": "Oberstes Stockwerk / Penthouse"
  },
  "isFeatured": true,
  "serviceIds": [
    1
  ],
  "priceUSD": 450000
}'
Request URL
https://realestate44.runasp.net/api/resales
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
 date: Thu,12 Nov 2026 10:48:36 GMT 
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
/api/resales/{id}


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
currency
string
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/resales/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM'
Request URL
https://realestate44.runasp.net/api/resales/2
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
    "markerId": "962095",
    "name": "Azure Skyline Penthouse Suite",
    "description": "An exclusive penthouse featuring panoramic sea views, contemporary open-plan living, private rooftop terrace, and high-end Italian finishes.",
    "area": 240,
    "noBathRoom": 3,
    "noBedRoom": 3,
    "noKitchen": 1,
    "floorName": "Top Floor / Penthouse",
    "floorNumber": 12,
    "view": "Panoramic Sea and Marina View",
    "propertyType": "Studio",
    "isFeatured": true,
    "isActive": true,
    "projectName": "Palm Hills",
    "project": {
      "id": 1,
      "name": "Palm Hills",
      "description": "Luxury complex"
    },
    "prices": [
      {
        "id": 5,
        "currency": "USD",
        "price": 450000
      }
    ],
    "imageUrls": [],
    "services": [
      {
        "id": 1,
        "name": "stringgsdfg",
        "icon": "MdLocalParking"
      }
    ],
    "createdBy": "Mo@gmail.com",
    "createdAt": "2026-11-12T10:48:37.5586644",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:48:42 GMT 
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
  "markerId": "string",
  "name": "string",
  "description": "string",
  "area": 0,
  "noBathRoom": 0,
  "noBedRoom": 0,
  "noKitchen": 0,
  "floorName": "string",
  "floorNumber": 0,
  "view": "string",
  "propertyType": "string",
  "isFeatured": true,
  "isActive": true,
  "projectName": "string",
  "project": {
    "id": 0,
    "name": "string",
    "description": "string"
  },
  "prices": [
    {
      "id": 0,
      "currency": "string",
      "price": 0
    }
  ],
  "imageUrls": [
    "string"
  ],
  "services": [
    {
      "id": 0,
      "name": "string",
      "icon": "string"
    }
  ],
  "createdBy": "string",
  "createdAt": "2026-11-12T10:52:02.341Z",
  "updatedBy": "string",
  "updatedAt": "2026-11-12T10:52:02.341Z"
}
No links

PUT
/api/resales/{id}


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
  },
  "view": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "propertyType": 0,
  "noBathRoom": 0,
  "noBedRoom": 0,
  "noKitchen": 0,
  "area": 0,
  "floorNumber": 0,
  "floorName": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "serviceIds": [
    0
  ],
  "priceUSD": 0,
  "isFeatured": true
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
true
No links

DELETE
/api/resales/{id}


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
No links


GET
/api/resales/{id}/images


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
  'https://realestate44.runasp.net/api/resales/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM'
Request URL
https://realestate44.runasp.net/api/resales/2/images
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
      "imageUrl": "images/resales/87f4076a-79b0-4640-a05e-fc3c80a86ec9.webp",
      "isPrimary": true,
      "sortOrder": 0
    },
    {
      "id": 2,
      "imageUrl": "images/resales/2e35c5c8-12da-496a-b12f-221642600e23.webp",
      "isPrimary": false,
      "sortOrder": 1
    },
    {
      "id": 3,
      "imageUrl": "images/resales/e5b1b53b-ec8e-4ea0-b569-4b4945180d8c.webp",
      "isPrimary": false,
      "sortOrder": 2
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:50:08 GMT 
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

POST
/api/resales/{id}/images


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
ResaleId
integer($int32)
2
Send empty value
Images
array
image2.webp-
image1 - Copy.webp-
image1.webp-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/resales/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM' \
  -H 'Content-Type: multipart/form-data' \
  -F 'ResaleId=2' \
  -F 'Images=@image2.webp;type=image/webp' \
  -F 'Images=@image1 - Copy.webp;type=image/webp' \
  -F 'Images=@image1.webp;type=image/webp'
Request URL
https://realestate44.runasp.net/api/resales/2/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": [
    "images/resales/87f4076a-79b0-4640-a05e-fc3c80a86ec9.webp",
    "images/resales/2e35c5c8-12da-496a-b12f-221642600e23.webp",
    "images/resales/e5b1b53b-ec8e-4ea0-b569-4b4945180d8c.webp"
  ],
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:49:27 GMT 
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": [
    "string"
  ]
}
No links



DELETE
/api/resales/{id}/images/{imageId}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
imageId *
integer($int32)
(path)
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
true
No links

PUT
/api/resales/images/{imageId}/primary


Parameters
Cancel
Name	Description
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
  'https://realestate44.runasp.net/api/resales/images/2/primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDgwNTAzLCJleHAiOjE3OTQ0ODQxMDMsImlhdCI6MTc5NDQ4MDUwMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.XU--G_ex1xmCk6txByY5T1TYEyx49jR3QjxClp7yuLM' \
  -H 'Content-Type: application/json' \
  -d '{
  "isPrimary": true
}'
Request URL
https://realestate44.runasp.net/api/resales/images/2/primary
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
 date: Thu,12 Nov 2026 10:50:21 GMT 
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

PUT
/api/resales/{id}/status


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
  "isActive": true
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
true
No links

PUT
/api/resales/{id}/featured


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
  "isFeatured": true
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
true
No links

DELETE
/api/resales/{id}/services/{serviceId}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
serviceId *
integer($int32)
(path)
serviceId
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