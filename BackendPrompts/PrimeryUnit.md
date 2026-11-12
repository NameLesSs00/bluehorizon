review this and create a plan for it could you do that ?
PrimaryUnits


GET
/api/primary-units


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
Search
string
(query)
Search
ProjectId
integer($int32)
(query)
ProjectId
PropertyType
string
(query)
PropertyType
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
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
Currency
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
  'https://realestate44.runasp.net/api/primary-units' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg1MzE0LCJleHAiOjE3OTQ0ODg5MTQsImlhdCI6MTc5NDQ4NTMxNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.9f-XOQq3_SUbfiDn_3Jr4whAjjx9TmWMooa8EmXbTls'
Request URL
https://realestate44.runasp.net/api/primary-units
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
        "markerId": "666832",
        "name": "Garden View Duplex Suite",
        "description": "A contemporary garden-level duplex featuring direct access to landscaped green areas, a private terrace, modern open-plan living, and premium finishes.",
        "area": 165,
        "noBathRoom": 2,
        "noBedRoom": 3,
        "noKitchen": 1,
        "propertyType": "Villa",
        "floorNumber": 0,
        "view": "Landscaped Garden & Pool View",
        "floorName": "Ground Floor",
        "isFeatured": true,
        "isActive": true,
        "projectId": 4,
        "projectName": "string",
        "prices": [
          {
            "id": 5,
            "currency": "USD",
            "price": 245000
          }
        ],
        "images": [
          {
            "id": 1,
            "imageUrl": "images/primaryunits/a5311fd0-fed4-4c1f-9836-895dc356f992.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 2,
            "imageUrl": "images/primaryunits/9aebdc32-8bfd-43a0-9919-44f8b313b6e2.webp",
            "isPrimary": false,
            "sortOrder": 1
          }
        ],
        "services": [
          {
            "id": 1,
            "name": "stringgsdfg",
            "icon": "MdLocalParking"
          }
        ],
        "reviews": [],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-12T12:08:56.6431822",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "markerId": "202027",
        "name": "Luxury Sea View Apartment",
        "description": "A modern apartment featuring spacious interiors, premium finishing, and beautiful sea views.",
        "area": 125,
        "noBathRoom": 2,
        "noBedRoom": 3,
        "noKitchen": 1,
        "propertyType": "Apartment",
        "floorNumber": 3,
        "view": "Sea View",
        "floorName": "Third Floor",
        "isFeatured": true,
        "isActive": true,
        "projectId": 3,
        "projectName": "Palm Residence",
        "prices": [
          {
            "id": 1,
            "currency": "USD",
            "price": 145000
          }
        ],
        "images": [],
        "services": [
          {
            "id": 1,
            "name": "stringgsdfg",
            "icon": "MdLocalParking"
          }
        ],
        "reviews": [],
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-10T14:11:46.4843196",
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
 date: Thu,12 Nov 2026 12:10:23 GMT 
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
      "propertyType": "string",
      "floorNumber": 0,
      "view": "string",
      "floorName": "string",
      "isFeatured": true,
      "isActive": true,
      "projectId": 0,
      "projectName": "string",
      "prices": [
        {
          "id": 0,
          "currency": "string",
          "price": 0
        }
      ],
      "images": [
        {
          "id": 0,
          "imageUrl": "string",
          "isPrimary": true,
          "sortOrder": 0
        }
      ],
      "services": [
        {
          "id": 0,
          "name": "string",
          "icon": "string"
        }
      ],
      "reviews": [
        {
          "id": 0,
          "fullName": "string",
          "comment": "string",
          "rate": 0,
          "createdAt": "2026-11-12T12:10:24.060Z"
        }
      ],
      "createdBy": "string",
      "createdAt": "2026-11-12T12:10:24.060Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-12T12:10:24.060Z"
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
/api/primary-units

GET
/api/primary-units/{id}

Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "projectId": 4,
  "name": {
    "en": "Garden View Duplex Suite",
    "ar": "جناح دوبلكس بإطلالة على الحديقة",
    "de": "Gartenblick-Duplex-Suite"
  },
  "description": {
    "en": "A contemporary garden-level duplex featuring direct access to landscaped green areas, a private terrace, modern open-plan living, and premium finishes.",
    "ar": "شقة دوبلكس عصرية في الطابق الأرضي تتميز بالوصول المباشر إلى المساحات الخضراء، وتراس خاص، ومنطقة معيشة مفتوحة حديثة، وتشطيبات ممتازة.",
    "de": "Ein modernes Duplex auf Gartenebene mit direktem Zugang zu angelegten Grünflächen, einer privaten Terrasse, modernem Wohnen im offenen Schnitt und erstklassiger Ausstattung."
  },
  "view": {
    "en": "Landscaped Garden & Pool View",
    "ar": "إطلالة على الحديقة المنسقة والمسبح",
    "de": "Blick auf den angelegten Garten und Pool"
  },
  "area": 165,
  "noBathRoom": 2,
  "noBedRoom": 3,
  "noKitchen": 1,
  "propertyType": "Villa",
  "floorNumber": 0,
  "floorName": {
    "en": "Ground Floor",
    "ar": "الطابق الأرضي",
    "de": "Erdgeschoss"
  },
  "isFeatured": true,
  "priceUSD": 245000,
  "serviceIds": [
    1
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/primary-units' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg1MzE0LCJleHAiOjE3OTQ0ODg5MTQsImlhdCI6MTc5NDQ4NTMxNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.9f-XOQq3_SUbfiDn_3Jr4whAjjx9TmWMooa8EmXbTls' \
  -H 'Content-Type: application/json' \
  -d '{
  "projectId": 4,
  "name": {
    "en": "Garden View Duplex Suite",
    "ar": "جناح دوبلكس بإطلالة على الحديقة",
    "de": "Gartenblick-Duplex-Suite"
  },
  "description": {
    "en": "A contemporary garden-level duplex featuring direct access to landscaped green areas, a private terrace, modern open-plan living, and premium finishes.",
    "ar": "شقة دوبلكس عصرية في الطابق الأرضي تتميز بالوصول المباشر إلى المساحات الخضراء، وتراس خاص، ومنطقة معيشة مفتوحة حديثة، وتشطيبات ممتازة.",
    "de": "Ein modernes Duplex auf Gartenebene mit direktem Zugang zu angelegten Grünflächen, einer privaten Terrasse, modernem Wohnen im offenen Schnitt und erstklassiger Ausstattung."
  },
  "view": {
    "en": "Landscaped Garden & Pool View",
    "ar": "إطلالة على الحديقة المنسقة والمسبح",
    "de": "Blick auf den angelegten Garten und Pool"
  },
  "area": 165,
  "noBathRoom": 2,
  "noBedRoom": 3,
  "noKitchen": 1,
  "propertyType": "Villa",
  "floorNumber": 0,
  "floorName": {
    "en": "Ground Floor",
    "ar": "الطابق الأرضي",
    "de": "Erdgeschoss"
  },
  "isFeatured": true,
  "priceUSD": 245000,
  "serviceIds": [
    1
  ]
}'
Request URL
https://realestate44.runasp.net/api/primary-units
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
  'https://realestate44.runasp.net/api/primary-units/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg1MzE0LCJleHAiOjE3OTQ0ODg5MTQsImlhdCI6MTc5NDQ4NTMxNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.9f-XOQq3_SUbfiDn_3Jr4whAjjx9TmWMooa8EmXbTls'
Request URL
https://realestate44.runasp.net/api/primary-units/2
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
    "markerId": "666832",
    "name": "Garden View Duplex Suite",
    "description": "A contemporary garden-level duplex featuring direct access to landscaped green areas, a private terrace, modern open-plan living, and premium finishes.",
    "area": 165,
    "noBathRoom": 2,
    "noBedRoom": 3,
    "noKitchen": 1,
    "propertyType": "Villa",
    "floorNumber": 0,
    "view": "Landscaped Garden & Pool View",
    "floorName": "Ground Floor",
    "isFeatured": true,
    "isActive": true,
    "projectId": 4,
    "projectName": "string",
    "prices": [
      {
        "id": 5,
        "currency": "USD",
        "price": 245000
      }
    ],
    "images": [],
    "services": [
      {
        "id": 1,
        "name": "stringgsdfg",
        "icon": "MdLocalParking"
      }
    ],
    "reviews": [],
    "createdBy": "Mo@gmail.com",
    "createdAt": "2026-11-12T12:08:56.6431822",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 12:09:04 GMT 
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
  "propertyType": "string",
  "floorNumber": 0,
  "view": "string",
  "floorName": "string",
  "isFeatured": true,
  "isActive": true,
  "projectId": 0,
  "projectName": "string",
  "prices": [
    {
      "id": 0,
      "currency": "string",
      "price": 0
    }
  ],
  "images": [
    {
      "id": 0,
      "imageUrl": "string",
      "isPrimary": true,
      "sortOrder": 0
    }
  ],
  "services": [
    {
      "id": 0,
      "name": "string",
      "icon": "string"
    }
  ],
  "reviews": [
    {
      "id": 0,
      "fullName": "string",
      "comment": "string",
      "rate": 0,
      "createdAt": "2026-11-12T12:09:58.910Z"
    }
  ],
  "createdBy": "string",
  "createdAt": "2026-11-12T12:09:58.910Z",
  "updatedBy": "string",
  "updatedAt": "2026-11-12T12:09:58.910Z"
}
No links

PUT
/api/primary-units/{id}


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
  "projectId": 0,
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
  "area": 0,
  "noBathRoom": 0,
  "noBedRoom": 0,
  "noKitchen": 0,
  "propertyType": "string",
  "floorNumber": 0,
  "floorName": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "isFeatured": true,
  "priceUSD": 0,
  "serviceIds": [
    0
  ]
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
/api/primary-units/{id}


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

POST
/api/primary-units/{id}/reviews



GET
/api/primary-units/{id}/images


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
  'https://realestate44.runasp.net/api/primary-units/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg1MzE0LCJleHAiOjE3OTQ0ODg5MTQsImlhdCI6MTc5NDQ4NTMxNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.9f-XOQq3_SUbfiDn_3Jr4whAjjx9TmWMooa8EmXbTls'
Request URL
https://realestate44.runasp.net/api/primary-units/2/images
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
      "imageUrl": "images/primaryunits/a5311fd0-fed4-4c1f-9836-895dc356f992.webp",
      "isPrimary": true,
      "sortOrder": 0
    },
    {
      "id": 2,
      "imageUrl": "images/primaryunits/9aebdc32-8bfd-43a0-9919-44f8b313b6e2.webp",
      "isPrimary": false,
      "sortOrder": 1
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 12:09:42 GMT 
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
/api/primary-units/{id}/images


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
PrimaryUnitId
integer($int32)
2
Send empty value
Images
array
image2 - Copy.webp-
image1 - Copy.webp-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/primary-units/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg1MzE0LCJleHAiOjE3OTQ0ODg5MTQsImlhdCI6MTc5NDQ4NTMxNCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.9f-XOQq3_SUbfiDn_3Jr4whAjjx9TmWMooa8EmXbTls' \
  -H 'Content-Type: multipart/form-data' \
  -F 'PrimaryUnitId=2' \
  -F 'Images=@image2 - Copy.webp;type=image/webp' \
  -F 'Images=@image1 - Copy.webp;type=image/webp'
Request URL
https://realestate44.runasp.net/api/primary-units/2/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": [
    "images/primaryunits/a5311fd0-fed4-4c1f-9836-895dc356f992.webp",
    "images/primaryunits/9aebdc32-8bfd-43a0-9919-44f8b313b6e2.webp"
  ],
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 12:09:38 GMT 
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

PUT
/api/primary-units/{id}/images



DELETE
/api/primary-units/{id}/images/{imageId}


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
/api/primary-units/images/{imageId}/primary


Parameters
Try it out
Name	Description
imageId *
integer($int32)
(path)
imageId
Request body

application/json
Example Value
Schema
{
  "isPrimary": true
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
/api/primary-units/{id}/status


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
/api/primary-units/{id}/featured


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
/api/primary-units/{id}/services/{serviceId}


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
Code	Description