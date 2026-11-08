public enum FurnitureType
{
    None = 0,
    Semi = 1,
    Fully = 2
}
Projects
notes that we have to put all of the prices in all currnecyes so that we could create a plan could you create a full plan so that it work right ?

GET
/api/Projects


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
ProjectTypeId
integer($int32)
(query)
ProjectTypeId
MinimumPrice
number($double)
(query)
MinimumPrice
MaximumPrice
number($double)
(query)
MaximumPrice
IsFurniture
boolean
(query)

--
FurnitureType
integer($int32)
(query)

--
DeliveryDateFrom
string($date-time)
(query)
DeliveryDateFrom
DeliveryDateTo
string($date-time)
(query)
DeliveryDateTo
IsFeature
boolean
(query)

--
FeatureId
integer($int32)
(query)
FeatureId
FacilityId
integer($int32)
(query)
FacilityId
LocationId
integer($int32)
(query)
LocationId
SearchTerm
string
(query)
SearchTerm
Search
string
(query)
Search
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
  'https://realestate22.runasp.net/api/Projects' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTQwNTMwLCJleHAiOjE3OTQxNDQxMzAsImlhdCI6MTc5NDE0MDUzMCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ._i35sQb6VAid6OwT_RxRHOiBp50wIj2PE12JzUIavZQ'
Request URL
https://realestate22.runasp.net/api/Projects
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "",
  "data": {
    "items": [
      {
        "id": 4,
        "name": "Modern Sunset Residence",
        "description": "A luxury residential development featuring sustainable architecture and panoramic sea views.",
        "locationId": 6,
        "locationName": "Hurghada",
        "deliveryDate": "2028-12-31T00:00:00",
        "isFurniture": true,
        "furnitureType": "Semi",
        "isFeature": true,
        "prices": [
          {
            "id": 5,
            "currency": "USD",
            "minimumPrice": 250000,
            "maximumPrice": 1200000
          }
        ],
        "projectTypes": [
          {
            "id": 2,
            "name": "Vila",
            "icon": "LuHouse"
          }
        ],
        "projectTypeIds": [],
        "imageUrls": [],
        "facilities": [
          {
            "id": 6,
            "name": "en",
            "icon": "string"
          }
        ],
        "createdBy": null,
        "createdAt": "2026-11-08T12:27:36.9351952",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 3,
        "name": "Blue Horizon Residence",
        "description": "A modern residential project offering luxury apartments, premium facilities, and beautiful sea views in a prime location.",
        "locationId": null,
        "locationName": null,
        "deliveryDate": "2028-12-31T00:00:00",
        "isFurniture": true,
        "furnitureType": "None",
        "isFeature": true,
        "prices": [
          {
            "id": 1,
            "currency": "USD",
            "minimumPrice": 120000,
            "maximumPrice": 250000
          }
        ],
        "projectTypes": [
          {
            "id": 3,
            "name": "sdaf",
            "icon": "MdVilla"
          }
        ],
        "projectTypeIds": [],
        "imageUrls": [],
        "facilities": [
          {
            "id": 6,
            "name": "en",
            "icon": "string"
          }
        ],
        "createdBy": null,
        "createdAt": "2026-11-07T20:12:02.4089687",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 2,
        "name": "Mountain View",
        "description": "Modern living",
        "locationId": null,
        "locationName": null,
        "deliveryDate": null,
        "isFurniture": false,
        "furnitureType": "None",
        "isFeature": false,
        "prices": [],
        "projectTypes": [],
        "projectTypeIds": [],
        "imageUrls": [],
        "facilities": [],
        "createdBy": null,
        "createdAt": "2026-11-01T16:44:14.4789872",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "name": "Palm Hills",
        "description": "Luxury complex",
        "locationId": null,
        "locationName": null,
        "deliveryDate": null,
        "isFurniture": false,
        "furnitureType": "None",
        "isFeature": false,
        "prices": [],
        "projectTypes": [],
        "projectTypeIds": [],
        "imageUrls": [],
        "facilities": [],
        "createdBy": null,
        "createdAt": "2026-11-01T16:44:14.4790123",
        "updatedBy": null,
        "updatedAt": null
      }
    ],
    "pageNumber": 1,
    "totalPages": 1,
    "totalCount": 4,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:27:44 GMT 
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
    "items": [
      {
        "id": 0,
        "name": "string",
        "description": "string",
        "locationId": 0,
        "locationName": "string",
        "deliveryDate": "2026-11-08T12:28:50.496Z",
        "isFurniture": true,
        "furnitureType": "string",
        "isFeature": true,
        "prices": [
          {
            "id": 0,
            "currency": "string",
            "minimumPrice": 0,
            "maximumPrice": 0
          }
        ],
        "projectTypes": [
          {
            "id": 0,
            "name": "string",
            "icon": "string"
          }
        ],
        "projectTypeIds": [
          0
        ],
        "imageUrls": [
          "string"
        ],
        "facilities": [
          {
            "id": 0,
            "name": "string",
            "icon": "string"
          }
        ],
        "createdBy": "string",
        "createdAt": "2026-11-08T12:28:50.496Z",
        "updatedBy": "string",
        "updatedAt": "2026-11-08T12:28:50.496Z"
      }
    ],
    "pageNumber": 0,
    "totalPages": 0,
    "totalCount": 0,
    "hasPreviousPage": true,
    "hasNextPage": true
  },
  "errors": "string"
}
No links

POST
/api/Projects


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "Modern Sunset Residence",
    "ar": "ممشى غروب الشمس الحديث",
    "de": "Moderne Sonnenuntergangsresidenz"
  },
  "description": {
    "en": "A luxury residential development featuring sustainable architecture and panoramic sea views.",
    "ar": "مشروع سكني فاخر يضم هندسة معمارية مستدامة وإطلالات بانورامية على البحر.",
    "de": "Ein luxuriöses Wohnprojekt mit nachhaltiger Architektur und Panoramablick auf das Meer."
  },
  "locationId": 6,
  "deliveryDate": "2028-12-31T00:00:00.000Z",
  "isFurniture": true,
  "furnitureType": 1,
  "isFeature": true,
  "projectTypeIds": [2],
  "facilityIds": [6],
  "prices": [
    {
      "currency": "USD",
      "minimumPrice": 250000,
      "maximumPrice": 1200000
    },
    {
      "currency": "EUR",
      "minimumPrice": 230000,
      "maximumPrice": 1100000
    },
    {
      "currency": "GBP",
      "minimumPrice": 200000,
      "maximumPrice": 950000
    },
    {
      "currency": "EGP",
      "minimumPrice": 12000000,
      "maximumPrice": 60000000
    }
  ]
 
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Projects' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTQwNTMwLCJleHAiOjE3OTQxNDQxMzAsImlhdCI6MTc5NDE0MDUzMCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ._i35sQb6VAid6OwT_RxRHOiBp50wIj2PE12JzUIavZQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "Modern Sunset Residence",
    "ar": "ممشى غروب الشمس الحديث",
    "de": "Moderne Sonnenuntergangsresidenz"
  },
  "description": {
    "en": "A luxury residential development featuring sustainable architecture and panoramic sea views.",
    "ar": "مشروع سكني فاخر يضم هندسة معمارية مستدامة وإطلالات بانورامية على البحر.",
    "de": "Ein luxuriöses Wohnprojekt mit nachhaltiger Architektur und Panoramablick auf das Meer."
  },
  "locationId": 6,
  "deliveryDate": "2028-12-31T00:00:00.000Z",
  "isFurniture": true,
  "furnitureType": 1,
  "isFeature": true,
  "projectTypeIds": [2],
  "facilityIds": [6],
  "prices": [
    {
      "currency": "USD",
      "minimumPrice": 250000,
      "maximumPrice": 1200000
    },
    {
      "currency": "EUR",
      "minimumPrice": 230000,
      "maximumPrice": 1100000
    },
    {
      "currency": "GBP",
      "minimumPrice": 200000,
      "maximumPrice": 950000
    },
    {
      "currency": "EGP",
      "minimumPrice": 12000000,
      "maximumPrice": 60000000
    }
  ]
 
}'
Request URL
https://realestate22.runasp.net/api/Projects
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 4,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:27:36 GMT 
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
/api/Projects


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
  "description": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "locationId": 0,
  "deliveryDate": "2026-11-08T12:28:50.502Z",
  "isFurniture": true,
  "furnitureType": 0,
  "isFeature": true,
  "projectTypeIds": [
    0
  ],
  "facilityIds": [
    0
  ],
  "prices": [
    {
      "currency": "string",
      "minimumPrice": 0,
      "maximumPrice": 0
    }
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
{
  "success": true,
  "message": "string",
  "data": 0,
  "errors": "string"
}
No links

GET
/api/Projects/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
4
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
  'https://realestate22.runasp.net/api/Projects/4' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MTQwNTMwLCJleHAiOjE3OTQxNDQxMzAsImlhdCI6MTc5NDE0MDUzMCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ._i35sQb6VAid6OwT_RxRHOiBp50wIj2PE12JzUIavZQ'
Request URL
https://realestate22.runasp.net/api/Projects/4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "",
  "data": {
    "id": 4,
    "name": "Modern Sunset Residence",
    "description": "A luxury residential development featuring sustainable architecture and panoramic sea views.",
    "locationId": 6,
    "locationName": "Hurghada",
    "deliveryDate": "2028-12-31T00:00:00",
    "isFurniture": true,
    "furnitureType": "Semi",
    "isFeature": true,
    "prices": [
      {
        "id": 5,
        "currency": "USD",
        "minimumPrice": 250000,
        "maximumPrice": 1200000
      }
    ],
    "projectTypes": [
      {
        "id": 2,
        "name": "Vila",
        "icon": "LuHouse"
      }
    ],
    "projectTypeIds": [],
    "imageUrls": [],
    "facilities": [
      {
        "id": 6,
        "name": "en",
        "icon": "string"
      }
    ],
    "createdBy": null,
    "createdAt": "2026-11-08T12:27:36.9351952",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,08 Nov 2026 12:28:49 GMT 
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
    "description": "string",
    "locationId": 0,
    "locationName": "string",
    "deliveryDate": "2026-11-08T12:28:50.508Z",
    "isFurniture": true,
    "furnitureType": "string",
    "isFeature": true,
    "prices": [
      {
        "id": 0,
        "currency": "string",
        "minimumPrice": 0,
        "maximumPrice": 0
      }
    ],
    "projectTypes": [
      {
        "id": 0,
        "name": "string",
        "icon": "string"
      }
    ],
    "projectTypeIds": [
      0
    ],
    "imageUrls": [
      "string"
    ],
    "facilities": [
      {
        "id": 0,
        "name": "string",
        "icon": "string"
      }
    ],
    "createdBy": "string",
    "createdAt": "2026-11-08T12:28:50.508Z",
    "updatedBy": "string",
    "updatedAt": "2026-11-08T12:28:50.508Z"
  },
  "errors": "string"
}
No links

DELETE
/api/Projects/{id}


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
/api/Projects/{id}/images


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Request body

multipart/form-data
files
array
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
  "data": [
    "string"
  ],
  "errors": "string"
}
No links

DELETE
/api/Projects/{id}/deleteproject/images


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
url
string
(query)
url
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
/api/Projects/delete-project-facility


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "projectId": 0,
  "faciltyId": 0
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": true
}