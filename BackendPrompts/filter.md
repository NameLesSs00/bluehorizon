PrimaryUnits


GET
/api/primary-units


Parameters
Try it out
Name	Description
Language
string
(query)
Available values : en, ar, de, ru


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
PrimaryUnitServiceId
integer($int32)
(query)
PrimaryUnitServiceId
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
Available values : EUR, USD, EGP, GBP


--
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
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
          "createdAt": "2026-11-26T11:26:56.072Z"
        }
      ],
      "createdBy": "string",
      "createdAt": "2026-11-26T11:26:56.072Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-26T11:26:56.072Z"
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
Rental


GET
/api/rentals


Parameters
Try it out
Name	Description
Language
string
(query)
Available values : en, ar, de, ru


--
Currency
string
(query)
Available values : EUR, USD, EGP, GBP


--
CategoryItemId
integer($int32)
(query)
CategoryItemId
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
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
        "propertyType": "Apartment",
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
        "createdAt": "2026-11-26T11:28:47.537Z",
        "updatedBy": "string",
        "updatedAt": "2026-11-26T11:28:47.537Z"
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
Resale


GET
/api/resales


Parameters
Try it out
Name	Description
Language
string
(query)
Available values : en, ar, de, ru


--
Currency
string
(query)
Available values : EUR, USD, EGP, GBP


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
ResaleUnitServiceId
integer($int32)
(query)
ResaleUnitServiceId
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
      "createdAt": "2026-11-26T11:29:00.424Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-26T11:29:00.424Z"
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
UnitOutsides


GET
/api/unit-outsides


Parameters
Try it out
Name	Description
Language
string
(query)
Available values : en, ar, de, ru


--
Currency
string
(query)
Available values : EUR, USD, EGP, GBP


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
Available values : Apartment, Villa, Townhouse, Studio, Penthouse, OneBedroom, TwoBedroom, ThreeBedroom, Chalet, FourBedroom


--
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
OutsideUnitServiceId
integer($int32)
(query)
OutsideUnitServiceId
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
          "createdAt": "2026-11-26T11:29:17.019Z"
        }
      ],
      "createdBy": "string",
      "createdAt": "2026-11-26T11:29:17.019Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-26T11:29:17.019Z"
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}