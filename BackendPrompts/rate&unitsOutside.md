GET
/api/Auth/exchange-rates


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Auth/exchange-rates' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk'
Request URL
https://realestate44.runasp.net/api/Auth/exchange-rates
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "baseCurrency": "USD",
    "baseAmount": 1,
    "lastUpdated": "2026-11-12T09:37:25.6060883",
    "rates": [
      {
        "currencyCode": "EGP",
        "amount": 53.55
      },
      {
        "currencyCode": "EUR",
        "amount": 0.9
      },
      {
        "currencyCode": "GBP",
        "amount": 0.752
      },
      {
        "currencyCode": "USD",
        "amount": 1
      }
    ]
  },
  "errors": null
}   


note that we wil be only using the currencyCode later so that we could show them in the clinet side in the header we don't have it right now but we add it later it will be stored in the app state using zutain and after that we could use those currney only we will nto show the amount or the extange rate that is the use case for it will be in the backend gound okay ?


UnitOutsides


GET
/api/unit-outsides


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
City
string
(query)
City
Country
string
(query)
Country
NoFloor
integer($int32)
(query)
NoFloor
MinFloor
integer($int32)
(query)
MinFloor
MaxFloor
integer($int32)
(query)
MaxFloor
IsActive
boolean
(query)

--
FeatureId
integer($int32)
(query)
FeatureId
FeatureName
string
(query)
FeatureName
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
  'https://realestate44.runasp.net/api/unit-outsides' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk'
Request URL
https://realestate44.runasp.net/api/unit-outsides
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
        "name": "Luxury Beachfront Apartment with Red Sea View",
        "description": "Experience ultimate comfort in this modern 2-bedroom apartment located directly on the Red Sea coast. Features high-end finishes, a spacious balcony, and private beach access.",
        "price": 185000,
        "currencyCode": "USD",
        "area": 125,
        "noBathRoom": 2,
        "noBedRoom": 2,
        "noKitchen": 1,
        "country": "Egypt",
        "city": "Hurghada",
        "district": "El Memsha",
        "street": "Sheraton Road",
        "buildingNumber": "B4",
        "apartmentNumber": "302",
        "postalCode": "84511",
        "address": "Corniche Street, Near Marina, Hurghada",
        "latitude": 27.2579,
        "longitude": 33.8116,
        "propertyType": "Apartment",
        "floorNumber": 3,
        "view": "Direct Sea View",
        "floorName": "Third Floor",
        "isFeatured": true,
        "isActive": true,
        "markerId": "629537",
        "noFloor": 5,
        "locationUnitOutside": null,
        "prices": [
          {
            "id": 5,
            "currency": "USD",
            "price": 185000
          }
        ],
        "images": [
          {
            "id": 1,
            "imageUrl": "images/unitoutsides/19d71548-0824-4a41-a20a-214fdc56743d.webp",
            "isPrimary": false,
            "sortOrder": 0
          },
          {
            "id": 2,
            "imageUrl": "images/unitoutsides/81082ed8-f8a6-48c0-a332-6229a6efe56d.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 3,
            "imageUrl": "images/unitoutsides/03953844-8fe1-4c2e-8466-7ba1c545654f.webp",
            "isPrimary": true,
            "sortOrder": 2
          }
        ],
        "serviceIds": [
          1
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
        "createdAt": "2026-11-12T10:16:47.3299055",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "name": "Modern Luxury Villa",
        "description": "A spacious independent villa in a prime location in Hurghada, featuring modern architecture, high-quality finishing, and easy access to the beach and essential services.",
        "price": 285000,
        "currencyCode": "USD",
        "area": 220,
        "noBathRoom": 3,
        "noBedRoom": 4,
        "noKitchen": 1,
        "country": "Egypt",
        "city": "Hurghada",
        "district": "El Kawther",
        "street": "Touristic Promenade",
        "buildingNumber": "V-25",
        "apartmentNumber": "N/A",
        "postalCode": "84511",
        "address": "El Kawther, near the Touristic Promenade, Hurghada, Egypt",
        "latitude": 27.1783,
        "longitude": 33.8281,
        "propertyType": "Villa",
        "floorNumber": 2,
        "view": "Garden and Pool View",
        "floorName": "Ground and First Floor",
        "isFeatured": true,
        "isActive": true,
        "markerId": "412365",
        "noFloor": 2,
        "locationUnitOutside": null,
        "prices": [
          {
            "id": 1,
            "currency": "USD",
            "price": 285000
          }
        ],
        "images": [],
        "serviceIds": [
          1
        ],
        "services": [
          {
            "id": 1,
            "name": "stringgsdfg",
            "icon": "MdLocalParking"
          }
        ],
        "reviews": [],
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-10T14:26:16.2055721",
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
 date: Thu,12 Nov 2026 13:50:58 GMT 
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
      "price": 0,
      "currencyCode": "string",
      "area": 0,
      "noBathRoom": 0,
      "noBedRoom": 0,
      "noKitchen": 0,
      "country": "string",
      "city": "string",
      "district": "string",
      "street": "string",
      "buildingNumber": "string",
      "apartmentNumber": "string",
      "postalCode": "string",
      "address": "string",
      "latitude": 0,
      "longitude": 0,
      "propertyType": "string",
      "floorNumber": 0,
      "view": "string",
      "floorName": "string",
      "isFeatured": true,
      "isActive": true,
      "markerId": "string",
      "noFloor": 0,
      "locationUnitOutside": {
        "id": 0,
        "name": "string",
        "description": "string",
        "videoUrl": "string"
      },
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
      "serviceIds": [
        0
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
          "createdAt": "2026-11-12T14:00:40.420Z"
        }
      ],
      "createdBy": "string",
      "createdAt": "2026-11-12T14:00:40.420Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-12T14:00:40.420Z"
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
/api/unit-outsides


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "Luxurious Standalone Villa with Private Pool",
    "ar": "فيلا مستقلة فاخرة مع حمام سباحة خاص",
    "de": "Luxuriöse freistehende Villa mit privatem Pool"
  },
  "description": {
    "en": "Experience ultimate privacy and elegance in this stunning standalone villa. Featuring spacious living areas, a lush private garden, and modern architectural finishes throughout.",
    "ar": "استمتع بأقصى درجات الخصوصية والأناقة في هذه الفيلا المستقلة المذهلة. تتميز بمساحات معيشة واسعة، حديقة خاصة خضراء، وتشطيبات معمارية حديثة في كل أنحائها.",
    "de": "Erleben Sie ultimative Privatsphäre und Eleganz in dieser atemberaubenden freistehenden Villa. Ausgestattet mit großzügigen Wohnbereichen, einem üppigen privaten Garten und modernen architektonischen Oberflächen."
  },
  "view": {
    "en": "Garden and Pool View",
    "ar": "إطلالة على الحديقة وحمام السباحة",
    "de": "Garten- und Poolblick"
  },
  "area": 350,
  "noBathRoom": 4,
  "noBedRoom": 5,
  "noKitchen": 2,
  "country": {
    "en": "Egypt",
    "ar": "مصر",
    "de": "Ägypten"
  },
  "city": {
    "en": "Hurghada",
    "ar": "الغردقة",
    "de": "Hurghada"
  },
  "district": {
    "en": "Intercontinental District",
    "ar": "منطقة الأحياء",
    "de": "Intercontinental-Viertel"
  },
  "street": {
    "en": "Sunset Avenue",
    "ar": "شارع غروب الشمس",
    "de": "Sunset Avenue"
  },
  "address": {
    "en": "Villa 12, Sunset Avenue, Intercontinental District, Hurghada",
    "ar": "فيلا 12، شارع غروب الشمس، منطقة الأحياء، الغردقة",
    "de": "Villa 12, Sunset Avenue, Intercontinental-Viertel, Hurghada"
  },
  "buildingNumber": "12",
  "apartmentNumber": "A",
  "postalCode": "84511",
  "latitude": 27.2158,
  "longitude": 33.8291,
  "propertyType": "Villa",
  "floorNumber": 0,
  "floorName": {
    "en": "Ground Floor & First Floor",
    "ar": "الطابق الأرضي والأول",
    "de": "Erdgeschoss & Obergeschoss"
  },
  "isFeatured": true,
  "noFloor": 2,
  "priceUSD": 450000,
  "serviceIds": [
    1
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/unit-outsides' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "Luxurious Standalone Villa with Private Pool",
    "ar": "فيلا مستقلة فاخرة مع حمام سباحة خاص",
    "de": "Luxuriöse freistehende Villa mit privatem Pool"
  },
  "description": {
    "en": "Experience ultimate privacy and elegance in this stunning standalone villa. Featuring spacious living areas, a lush private garden, and modern architectural finishes throughout.",
    "ar": "استمتع بأقصى درجات الخصوصية والأناقة في هذه الفيلا المستقلة المذهلة. تتميز بمساحات معيشة واسعة، حديقة خاصة خضراء، وتشطيبات معمارية حديثة في كل أنحائها.",
    "de": "Erleben Sie ultimative Privatsphäre und Eleganz in dieser atemberaubenden freistehenden Villa. Ausgestattet mit großzügigen Wohnbereichen, einem üppigen privaten Garten und modernen architektonischen Oberflächen."
  },
  "view": {
    "en": "Garden and Pool View",
    "ar": "إطلالة على الحديقة وحمام السباحة",
    "de": "Garten- und Poolblick"
  },
  "area": 350,
  "noBathRoom": 4,
  "noBedRoom": 5,
  "noKitchen": 2,
  "country": {
    "en": "Egypt",
    "ar": "مصر",
    "de": "Ägypten"
  },
  "city": {
    "en": "Hurghada",
    "ar": "الغردقة",
    "de": "Hurghada"
  },
  "district": {
    "en": "Intercontinental District",
    "ar": "منطقة الأحياء",
    "de": "Intercontinental-Viertel"
  },
  "street": {
    "en": "Sunset Avenue",
    "ar": "شارع غروب الشمس",
    "de": "Sunset Avenue"
  },
  "address": {
    "en": "Villa 12, Sunset Avenue, Intercontinental District, Hurghada",
    "ar": "فيلا 12، شارع غروب الشمس، منطقة الأحياء، الغردقة",
    "de": "Villa 12, Sunset Avenue, Intercontinental-Viertel, Hurghada"
  },
  "buildingNumber": "12",
  "apartmentNumber": "A",
  "postalCode": "84511",
  "latitude": 27.2158,
  "longitude": 33.8291,
  "propertyType": "Villa",
  "floorNumber": 0,
  "floorName": {
    "en": "Ground Floor & First Floor",
    "ar": "الطابق الأرضي والأول",
    "de": "Erdgeschoss & Obergeschoss"
  },
  "isFeatured": true,
  "noFloor": 2,
  "priceUSD": 450000,
  "serviceIds": [
    1
  ]
}'
Request URL
https://realestate44.runasp.net/api/unit-outsides
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": 3,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 13:58:41 GMT 
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
/api/unit-outsides/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
3
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
  'https://realestate44.runasp.net/api/unit-outsides/3' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk'
Request URL
https://realestate44.runasp.net/api/unit-outsides/3
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 3,
    "name": "Luxurious Standalone Villa with Private Pool",
    "description": "Experience ultimate privacy and elegance in this stunning standalone villa. Featuring spacious living areas, a lush private garden, and modern architectural finishes throughout.",
    "price": 450000,
    "currencyCode": "USD",
    "area": 350,
    "noBathRoom": 4,
    "noBedRoom": 5,
    "noKitchen": 2,
    "country": "Egypt",
    "city": "Hurghada",
    "district": "Intercontinental District",
    "street": "Sunset Avenue",
    "buildingNumber": "12",
    "apartmentNumber": "A",
    "postalCode": "84511",
    "address": "Villa 12, Sunset Avenue, Intercontinental District, Hurghada",
    "latitude": 27.2158,
    "longitude": 33.8291,
    "propertyType": "Villa",
    "floorNumber": 0,
    "view": "Garden and Pool View",
    "floorName": "Ground Floor & First Floor",
    "isFeatured": true,
    "isActive": true,
    "markerId": "293330",
    "noFloor": 2,
    "locationUnitOutside": null,
    "prices": [
      {
        "id": 9,
        "currency": "USD",
        "price": 450000
      }
    ],
    "images": [],
    "serviceIds": [
      1
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
    "createdAt": "2026-11-12T13:58:42.541403",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 13:58:50 GMT 
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
  "price": 0,
  "currencyCode": "string",
  "area": 0,
  "noBathRoom": 0,
  "noBedRoom": 0,
  "noKitchen": 0,
  "country": "string",
  "city": "string",
  "district": "string",
  "street": "string",
  "buildingNumber": "string",
  "apartmentNumber": "string",
  "postalCode": "string",
  "address": "string",
  "latitude": 0,
  "longitude": 0,
  "propertyType": "string",
  "floorNumber": 0,
  "view": "string",
  "floorName": "string",
  "isFeatured": true,
  "isActive": true,
  "markerId": "string",
  "noFloor": 0,
  "locationUnitOutside": {
    "id": 0,
    "name": "string",
    "description": "string",
    "videoUrl": "string"
  },
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
  "serviceIds": [
    0
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
      "createdAt": "2026-11-12T14:00:40.432Z"
    }
  ],
  "createdBy": "string",
  "createdAt": "2026-11-12T14:00:40.432Z",
  "updatedBy": "string",
  "updatedAt": "2026-11-12T14:00:40.432Z"
}
No links

PUT
/api/unit-outsides/{id}


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
  "area": 0,
  "noBathRoom": 0,
  "noBedRoom": 0,
  "noKitchen": 0,
  "country": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "city": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "district": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "street": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "address": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "buildingNumber": "string",
  "apartmentNumber": "string",
  "postalCode": "string",
  "latitude": 0,
  "longitude": 0,
  "propertyType": "string",
  "floorNumber": 0,
  "floorName": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "isFeatured": true,
  "noFloor": 0,
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
/api/unit-outsides/{id}


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
/api/unit-outsides/{id}/reviews



GET
/api/unit-outsides/{id}/images


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
3
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/unit-outsides/3/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk'
Request URL
https://realestate44.runasp.net/api/unit-outsides/3/images
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
      "id": 4,
      "imageUrl": "images/unitoutsides/8be05b75-58e5-42df-9a19-59ef177a50c8.webp",
      "isPrimary": false,
      "sortOrder": 0
    },
    {
      "id": 5,
      "imageUrl": "images/unitoutsides/6f7d7de4-212d-4b7d-976d-ef71a0420b17.webp",
      "isPrimary": true,
      "sortOrder": 1
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 14:00:39 GMT 
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
/api/unit-outsides/{id}/images


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
3
Request body

multipart/form-data
images
array
image1 - Copy.webp-
image1.webp-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate44.runasp.net/api/unit-outsides/3/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk' \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@image1 - Copy.webp;type=image/webp' \
  -F 'images=@image1.webp;type=image/webp'
Request URL
https://realestate44.runasp.net/api/unit-outsides/3/images
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
 date: Thu,12 Nov 2026 14:00:19 GMT 
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
/api/unit-outsides/{id}/images


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
true
No links

PUT
/api/unit-outsides/{unitOutsideId}/images/{imageId}/primary


Parameters
Cancel
Name	Description
unitOutsideId *
integer($int32)
(path)
3
imageId *
integer($int32)
(path)
5
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
  'https://realestate44.runasp.net/api/unit-outsides/3/images/5/primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDkxMzk2LCJleHAiOjE3OTQ0OTQ5OTYsImlhdCI6MTc5NDQ5MTM5NiwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.AccVcS2d5qDlWtKWrjDOYFG3J5AVKqHrsUGnD_goMuk' \
  -H 'Content-Type: application/json' \
  -d '{
  "isPrimary": true
}'
Request URL
https://realestate44.runasp.net/api/unit-outsides/3/images/5/primary
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
 date: Thu,12 Nov 2026 14:00:32 GMT 
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
/api/unit-outsides/{id}/status


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
{
  "success": true,
  "message": "string",
  "data": true,
  "errors": "string"
}
No links

PUT
/api/unit-outsides/{id}/featured


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


note that the outsdie units will be named in the UI to be StandAlone props okay 