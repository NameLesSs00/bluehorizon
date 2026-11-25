Projects


GET
/api/Projects


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
Available values : 0, 1, 2


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
ProjectType
string
(query)
Available values : TopSeller, Luxury, BigHit


--
IsHotOffer
boolean
(query)

--
StartDateHotOffer
string($date-time)
(query)
StartDateHotOffer
EndDateHotOffer
string($date-time)
(query)
EndDateHotOffer
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
        "deliveryDate": "2026-11-25T17:23:57.203Z",
        "isFurniture": true,
        "furnitureType": "string",
        "isFeature": true,
        "projectType": "string",
        "isHotOffer": true,
        "startDateHotOffer": "2026-11-25T17:23:57.203Z",
        "endDateHotOffer": "2026-11-25T17:23:57.203Z",
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
        "images": [
          {
            "id": 0,
            "imageUrl": "string",
            "isPrimary": true
          }
        ],
        "facilities": [
          {
            "id": 0,
            "name": "string",
            "icon": "string"
          }
        ],
        "createdBy": "string",
        "createdAt": "2026-11-25T17:23:57.203Z",
        "updatedBy": "string",
        "updatedAt": "2026-11-25T17:23:57.203Z"
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
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": {
    "en": "string",
    "ar": "string",
    "de": "string",
    "ru": "string"
  },
  "description": {
    "en": "string",
    "ar": "string",
    "de": "string",
    "ru": "string"
  },
  "locationId": 0,
  "deliveryDate": "2026-11-25T17:23:57.142Z",
  "isFurniture": true,
  "furnitureType": 0,
  "isFeature": true,
  "projectType": "TopSeller",
  "isHotOffer": true,
  "startDateHotOffer": "2026-11-25T17:23:57.142Z",
  "endDateHotOffer": "2026-11-25T17:23:57.142Z",
  "projectTypeIds": [
    0
  ],
  "facilityIds": [
    0
  ],
  "minimumPriceUSD": 0,
  "maximumPriceUSD": 0
}