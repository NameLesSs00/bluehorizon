note that
 
Name	Description
Language
string
(query)
Available values : en, ar, de


--
Currency
string
(query)
Available values : EUR, USD, EGP, GBP
could you create a full plan for it also note that 


public enum PropertyType
{
    Apartment,
    Villa,
    Townhouse,
    Studio,
    Penthouse
        ,onebedroom,twobedroon,threebedroom,chalet,fourbedroom,studio,
} [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

Rental


could you create a full plan for it ? 

GET
/api/rentals


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
  'https://realestate44.runasp.net/api/rentals' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDc2MjY5LCJleHAiOjE3OTQ0Nzk4NjksImlhdCI6MTc5NDQ3NjI2OSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ELTinnlrPMId4WAWq-P9S6SRTzfZCXC9ggQZaUgitOk'
Request URL
https://realestate44.runasp.net/api/rentals
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
        "id": 2,
        "code": "HRG-RES-702",
        "name": "Seaside Luxury Pool Villa",
        "description": "Indulge in a relaxing stay at this stunning pool villa overlooking pristine waters. Features a fully equipped kitchen, spacious living areas, and a private pool.",
        "rentalLocation": {
          "id": 1,
          "name": "string",
          "description": "string",
          "videoUrl": null
        },
        "floor": "Ground & First Floor",
        "bedroomNo": 3,
        "bathroomNo": 3,
        "capacity": 6,
        "size": 220,
        "prices": [
          {
            "id": 5,
            "currency": "USD",
            "price": 320
          }
        ],
        "propertyType": 1,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": false,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 7 days before check-in. 50% refund thereafter.",
        "notes": "Please inform the host of your expected arrival time in advance.",
        "listingDetails": {
          "lateCheckIn": "Available until midnight for an additional fee.",
          "services": [
            "High-speed Wi-Fi",
            "Daily housekeeping",
            "Private chef upon request",
            "Airport shuttle"
          ],
          "extraPeopleFee": 25,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "2 additional guests allowed upon prior request."
        },
        "categoryItems": [
          {
            "id": 1,
            "name": "string",
            "icon": "string",
            "displayOrder": 0
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 1,
            "name": "Hurghada International Airport",
            "distance": "300 meters"
          }
        ],
        "images": [
          {
            "id": 1,
            "imageUrl": "images/Rentals/9feb3c37-bb14-41d4-8f4c-b994202abc3a.webp",
            "isPrimary": true,
            "sortOrder": 0
          },
          {
            "id": 2,
            "imageUrl": "images/Rentals/c591b989-1123-4e15-9dab-f3e78a00f402.webp",
            "isPrimary": false,
            "sortOrder": 1
          },
          {
            "id": 3,
            "imageUrl": "images/Rentals/f6e013f1-45ab-4579-b14e-145d01550743.webp",
            "isPrimary": false,
            "sortOrder": 2
          }
        ],
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-12T10:22:18.9986352",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "code": "RNT-HRG-001",
        "name": "Luxury Sea View Apartment",
        "description": "A fully furnished luxury apartment in Hurghada, featuring modern interiors, beautiful sea views, and access to premium facilities.",
        "rentalLocation": {
          "id": 1,
          "name": "string",
          "description": "string",
          "videoUrl": null
        },
        "floor": "3rd Floor",
        "bedroomNo": 2,
        "bathroomNo": 2,
        "capacity": 4,
        "size": 120,
        "prices": [
          {
            "id": 1,
            "currency": "USD",
            "price": 85
          }
        ],
        "propertyType": 1,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": false,
        "hasMountainView": false,
        "hasCityView": false,
        "rulesCancellation": "Free cancellation up to 7 days before check-in. Cancellations made later may be subject to a fee.",
        "notes": "Check-in: 2:00 PM | Check-out: 12:00 PM",
        "listingDetails": {
          "lateCheckIn": "Available upon request",
          "services": [
            "Wi-Fi",
            "Air Conditioning",
            "Swimming Pool",
            "Private Parking",
            "Housekeeping"
          ],
          "extraPeopleFee": 15,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "Maximum 2 additional guests"
        },
        "categoryItems": [
          {
            "id": 1,
            "name": "string",
            "icon": "string",
            "displayOrder": 0
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 1,
            "name": "Hurghada International Airport",
            "distance": "500 meters"
          }
        ],
        "images": [],
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-10T14:17:47.9490227",
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
 date: Thu,12 Nov 2026 10:25:38 GMT 
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
        "code": "string",
        "name": "string",
        "description": "string",
        "rentalLocation": {
          "id": 0,
          "name": "string",
          "description": "string",
          "videoUrl": "string"
        },
        "floor": "string",
        "bedroomNo": 0,
        "bathroomNo": 0,
        "capacity": 0,
        "size": 0,
        "prices": [
          {
            "id": 0,
            "currency": "string",
            "price": 0
          }
        ],
        "propertyType": 0,
        "isAvailable": true,
        "isFeatured": true,
        "hasSeaView": true,
        "hasPoolView": true,
        "hasGardenView": true,
        "hasMountainView": true,
        "hasCityView": true,
        "rulesCancellation": "string",
        "notes": "string",
        "listingDetails": {
          "lateCheckIn": "string",
          "services": [
            "string"
          ],
          "extraPeopleFee": 0,
          "familyFriendly": true,
          "privateEntrance": true,
          "extraPeople": "string"
        },
        "categoryItems": [
          {
            "id": 0,
            "name": "string",
            "icon": "string",
            "displayOrder": 0
          }
        ],
        "infoAreaPlaces": [
          {
            "id": 0,
            "name": "string",
            "distance": "string"
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
        "createdBy": "string",
        "createdAt": "2026-11-12T10:25:39.036Z",
        "updatedBy": "string",
        "updatedAt": "2026-11-12T10:25:39.036Z"
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
/api/rentals


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "code": "HRG-RES-702",
  "name": {
    "en": "Seaside Luxury Pool Villa",
    "ar": "فيلا فاخرة على شاطئ البحر مع مسبح",
    "de": "Luxus-Pool-Villa am Meer"
  },
  "description": {
    "en": "Indulge in a relaxing stay at this stunning pool villa overlooking pristine waters. Features a fully equipped kitchen, spacious living areas, and a private pool.",
    "ar": "استمتع بإقامة مريحة في هذه الفيلا المذهلة المطلة على المياه النقية. تتميز بمطبخ مجهز بالكامل، ومناطق معيشة واسعة، ومسبح خاص.",
    "de": "Genießen Sie einen entspannenden Aufenthalt in dieser atemberaubenden Pool-Villa mit Blick auf das kristallklare Wasser. Voll ausgestattete Küche, geräumige Wohnbereiche und ein privater Pool."
  },
  "rentalLocationId": 1,
  "floor": "Ground & First Floor",
  "bedroomNo": 3,
  "bathroomNo": 3,
  "capacity": 6,
  "size": 220,
  "priceUSD": 320,
  "propertyType": 1,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": false,
  "hasMountainView": false,
  "hasCityView": false,
  "rulesCancellation": {
    "en": "Free cancellation up to 7 days before check-in. 50% refund thereafter.",
    "ar": "إلغاء مجاني حتى قبل 7 أيام من تسجيل الوصول. استرداد 50% بعد ذلك.",
    "de": "Kostenlose Stornierung bis zu 7 Tage vor dem Check-in. Danach 50% Rückerstattung."
  },
  "notes": "Please inform the host of your expected arrival time in advance.",
  "listingDetails": {
    "lateCheckIn": "Available until midnight for an additional fee.",
    "services": [
      "High-speed Wi-Fi",
      "Daily housekeeping",
      "Private chef upon request",
      "Airport shuttle"
    ],
    "extraPeopleFee": 25,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "2 additional guests allowed upon prior request."
  },
  "propertyCategoryItemIds": [
    1
  ],
  "infoAreaPlaces": [
    {
      "infoAreaPlaceId": 1,
      "distance": "300 meters"
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/rentals' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDc2MjY5LCJleHAiOjE3OTQ0Nzk4NjksImlhdCI6MTc5NDQ3NjI2OSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ELTinnlrPMId4WAWq-P9S6SRTzfZCXC9ggQZaUgitOk' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "HRG-RES-702",
  "name": {
    "en": "Seaside Luxury Pool Villa",
    "ar": "فيلا فاخرة على شاطئ البحر مع مسبح",
    "de": "Luxus-Pool-Villa am Meer"
  },
  "description": {
    "en": "Indulge in a relaxing stay at this stunning pool villa overlooking pristine waters. Features a fully equipped kitchen, spacious living areas, and a private pool.",
    "ar": "استمتع بإقامة مريحة في هذه الفيلا المذهلة المطلة على المياه النقية. تتميز بمطبخ مجهز بالكامل، ومناطق معيشة واسعة، ومسبح خاص.",
    "de": "Genießen Sie einen entspannenden Aufenthalt in dieser atemberaubenden Pool-Villa mit Blick auf das kristallklare Wasser. Voll ausgestattete Küche, geräumige Wohnbereiche und ein privater Pool."
  },
  "rentalLocationId": 1,
  "floor": "Ground & First Floor",
  "bedroomNo": 3,
  "bathroomNo": 3,
  "capacity": 6,
  "size": 220,
  "priceUSD": 320,
  "propertyType": 1,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": false,
  "hasMountainView": false,
  "hasCityView": false,
  "rulesCancellation": {
    "en": "Free cancellation up to 7 days before check-in. 50% refund thereafter.",
    "ar": "إلغاء مجاني حتى قبل 7 أيام من تسجيل الوصول. استرداد 50% بعد ذلك.",
    "de": "Kostenlose Stornierung bis zu 7 Tage vor dem Check-in. Danach 50% Rückerstattung."
  },
  "notes": "Please inform the host of your expected arrival time in advance.",
  "listingDetails": {
    "lateCheckIn": "Available until midnight for an additional fee.",
    "services": [
      "High-speed Wi-Fi",
      "Daily housekeeping",
      "Private chef upon request",
      "Airport shuttle"
    ],
    "extraPeopleFee": 25,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "2 additional guests allowed upon prior request."
  },
  "propertyCategoryItemIds": [
    1
  ],
  "infoAreaPlaces": [
    {
      "infoAreaPlaceId": 1,
      "distance": "300 meters"
    }
  ]
}'
Request URL
https://realestate44.runasp.net/api/rentals
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rental 'HRG-RES-702' was created successfully.",
  "data": {
    "id": 2,
    "message": "Rental 'HRG-RES-702' was created successfully.",
    "prices": [
      {
        "id": 5,
        "currency": "USD",
        "price": 320
      },
      {
        "id": 6,
        "currency": "EUR",
        "price": 288
      },
      {
        "id": 7,
        "currency": "EGP",
        "price": 17136
      },
      {
        "id": 8,
        "currency": "GBP",
        "price": 240.64
      }
    ],
    "categoryItems": [
      {
        "id": 1,
        "name": "string",
        "icon": "string",
        "displayOrder": 0
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 1,
        "name": "Hurghada International Airport",
        "distance": "300 meters"
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:22:19 GMT 
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
    "message": "string",
    "prices": [
      {
        "id": 0,
        "currency": "string",
        "price": 0
      }
    ],
    "categoryItems": [
      {
        "id": 0,
        "name": "string",
        "icon": "string",
        "displayOrder": 0
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 0,
        "name": "string",
        "distance": "string"
      }
    ]
  },
  "errors": "string"
}
No links

GET
/api/rentals/{id}


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
  'https://realestate44.runasp.net/api/rentals/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDc2MjY5LCJleHAiOjE3OTQ0Nzk4NjksImlhdCI6MTc5NDQ3NjI2OSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ELTinnlrPMId4WAWq-P9S6SRTzfZCXC9ggQZaUgitOk'
Request URL
https://realestate44.runasp.net/api/rentals/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "",
  "data": {
    "id": 2,
    "code": "HRG-RES-702",
    "name": "Seaside Luxury Pool Villa",
    "description": "Indulge in a relaxing stay at this stunning pool villa overlooking pristine waters. Features a fully equipped kitchen, spacious living areas, and a private pool.",
    "rentalLocation": {
      "id": 1,
      "name": "string",
      "description": "string",
      "videoUrl": null
    },
    "floor": "Ground & First Floor",
    "bedroomNo": 3,
    "bathroomNo": 3,
    "capacity": 6,
    "size": 220,
    "prices": [
      {
        "id": 5,
        "currency": "USD",
        "price": 320
      }
    ],
    "propertyType": 1,
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": true,
    "hasPoolView": true,
    "hasGardenView": false,
    "hasMountainView": false,
    "hasCityView": false,
    "rulesCancellation": "Free cancellation up to 7 days before check-in. 50% refund thereafter.",
    "notes": "Please inform the host of your expected arrival time in advance.",
    "listingDetails": {
      "lateCheckIn": "Available until midnight for an additional fee.",
      "services": [
        "High-speed Wi-Fi",
        "Daily housekeeping",
        "Private chef upon request",
        "Airport shuttle"
      ],
      "extraPeopleFee": 25,
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "2 additional guests allowed upon prior request."
    },
    "categoryItems": [
      {
        "id": 1,
        "name": "string",
        "icon": "string",
        "displayOrder": 0
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 1,
        "name": "Hurghada International Airport",
        "distance": "300 meters"
      }
    ],
    "images": [
      {
        "id": 1,
        "imageUrl": "images/Rentals/9feb3c37-bb14-41d4-8f4c-b994202abc3a.webp",
        "isPrimary": true,
        "sortOrder": 0
      },
      {
        "id": 2,
        "imageUrl": "images/Rentals/c591b989-1123-4e15-9dab-f3e78a00f402.webp",
        "isPrimary": false,
        "sortOrder": 1
      },
      {
        "id": 3,
        "imageUrl": "images/Rentals/f6e013f1-45ab-4579-b14e-145d01550743.webp",
        "isPrimary": false,
        "sortOrder": 2
      }
    ],
    "createdBy": "Mo@gmail.com",
    "createdAt": "2026-11-12T10:22:18.9986352",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:25:11 GMT 
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
    "code": "string",
    "name": "string",
    "description": "string",
    "rentalLocation": {
      "id": 0,
      "name": "string",
      "description": "string",
      "videoUrl": "string"
    },
    "floor": "string",
    "bedroomNo": 0,
    "bathroomNo": 0,
    "capacity": 0,
    "size": 0,
    "prices": [
      {
        "id": 0,
        "currency": "string",
        "price": 0
      }
    ],
    "propertyType": 0,
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": true,
    "hasPoolView": true,
    "hasGardenView": true,
    "hasMountainView": true,
    "hasCityView": true,
    "rulesCancellation": "string",
    "notes": "string",
    "listingDetails": {
      "lateCheckIn": "string",
      "services": [
        "string"
      ],
      "extraPeopleFee": 0,
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "string"
    },
    "categoryItems": [
      {
        "id": 0,
        "name": "string",
        "icon": "string",
        "displayOrder": 0
      }
    ],
    "infoAreaPlaces": [
      {
        "id": 0,
        "name": "string",
        "distance": "string"
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
    "createdBy": "string",
    "createdAt": "2026-11-12T10:25:39.049Z",
    "updatedBy": "string",
    "updatedAt": "2026-11-12T10:25:39.049Z"
  },
  "errors": "string"
}
No links

PUT
/api/rentals/{id}


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
  "code": "string",
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
  "rentalLocationId": 0,
  "floor": "string",
  "bedroomNo": 0,
  "bathroomNo": 0,
  "capacity": 0,
  "size": 0,
  "priceUSD": 0,
  "propertyType": 0,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "rulesCancellation": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "notes": "string",
  "listingDetails": {
    "lateCheckIn": "string",
    "services": [
      "string"
    ],
    "extraPeopleFee": 0,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "string"
  },
  "propertyCategoryItemIds": [
    0
  ],
  "infoAreaPlaces": [
    {
      "infoAreaPlaceId": 0,
      "distance": "string"
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
  "data": true,
  "errors": "string"
}
No links

DELETE
/api/rentals/{id}


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


POST
/api/rentals/{rentalId}/images


Parameters
Cancel
Reset
Name	Description
rentalId *
integer($int32)
(path)
2
Request body

multipart/form-data
images
array
image2 - Copy.webp-
contactUs - Copy.png-
image1 - Copy.webp-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/rentals/2/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDc2MjY5LCJleHAiOjE3OTQ0Nzk4NjksImlhdCI6MTc5NDQ3NjI2OSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ELTinnlrPMId4WAWq-P9S6SRTzfZCXC9ggQZaUgitOk' \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@image2 - Copy.webp;type=image/webp' \
  -F 'images=@contactUs - Copy.png;type=image/png' \
  -F 'images=@image1 - Copy.webp;type=image/webp'
Request URL
https://realestate44.runasp.net/api/rentals/2/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rental images uploaded successfully.",
  "data": true,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 10:24:49 GMT 
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
/api/rentals/{rentalId}/images/{imageId}/primary


Parameters
Cancel
Name	Description
rentalId *
integer($int32)
(path)
2
imageId *
integer($int32)
(path)
1
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
  'https://realestate44.runasp.net/api/rentals/2/images/1/primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDc2MjY5LCJleHAiOjE3OTQ0Nzk4NjksImlhdCI6MTc5NDQ3NjI2OSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.ELTinnlrPMId4WAWq-P9S6SRTzfZCXC9ggQZaUgitOk' \
  -H 'Content-Type: application/json' \
  -d '{
  "isPrimary": true
}'
Request URL
https://realestate44.runasp.net/api/rentals/2/images/1/primary
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
 date: Thu,12 Nov 2026 10:25:23 GMT 
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
/api/rentals/{id}/images


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