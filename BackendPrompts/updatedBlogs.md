we have upadte the blogs so that we have the date and also the blog type could you make sure we add them right ?
Blogs


GET
/api/Blogs


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
  'https://realestate44.runasp.net/api/Blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg5MjE3LCJleHAiOjE3OTQ0OTI4MTcsImlhdCI6MTc5NDQ4OTIxNywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IcbfILSw0hDcvmiek4GozCghlhcInaQ0WHPArDk9-Ng'
Request URL
https://realestate44.runasp.net/api/Blogs
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
        "title": "Top 5 Tips for Buying Your First Property",
        "imageUrl": "",
        "publishDate": "2026-11-10T13:33:23.889",
        "blogType": "Buying Guide",
        "sections": [
          {
            "id": 1,
            "sectionNumber": 1,
            "tittle": "Define Your Budget",
            "content": "Before starting your property search, determine your total budget. Consider the property price, taxes, maintenance fees, and any additional expenses. Having a clear budget will help you focus on properties that match your financial situation.",
            "imageUrl": "images/blogs/b2adad72-5695-48c2-9331-7fef73403040.webp"
          },
          {
            "id": 2,
            "sectionNumber": 2,
            "tittle": "Choose the Right Location",
            "content": "Location is one of the most important factors in real estate. Look for areas close to essential services, transportation, schools, and shopping centers. Also consider future development plans that may increase the property's value.",
            "imageUrl": ""
          },
          {
            "id": 3,
            "sectionNumber": 3,
            "tittle": "Inspect the Property",
            "content": "Always inspect the property before making a purchase decision. Check the construction quality, plumbing, electrical systems, finishing, and available facilities. A professional inspection can help you avoid unexpected problems.",
            "imageUrl": ""
          },
          {
            "id": 4,
            "sectionNumber": 4,
            "tittle": "Review the Legal Documents",
            "content": "Make sure all ownership documents, licenses, contracts, and permits are valid and complete. Consult a qualified legal professional to verify the property's legal status before signing any agreement.",
            "imageUrl": ""
          },
          {
            "id": 5,
            "sectionNumber": 5,
            "tittle": "Think About Future Value",
            "content": "A property can be both a home and a long-term investment. Research the area's market trends, rental demand, infrastructure projects, and expected development. These factors can help you make a smarter investment decision.",
            "imageUrl": ""
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
 date: Thu,12 Nov 2026 13:30:34 GMT 
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
      "title": "string",
      "imageUrl": "string",
      "publishDate": "2026-11-12T13:30:48.700Z",
      "blogType": "string",
      "sections": [
        {
          "id": 0,
          "sectionNumber": 0,
          "tittle": "string",
          "content": "string",
          "imageUrl": "string"
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
/api/Blogs


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "title": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "publishDate": "2026-11-12T13:30:48.704Z",
  "blogType": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "sections": [
    {
      "sectionNumber": 0,
      "tittle": {
        "en": "string",
        "ar": "string",
        "de": "string"
      },
      "content": {
        "en": "string",
        "ar": "string",
        "de": "string"
      }
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
0
No links

PUT
/api/Blogs


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "title": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "publishDate": "2026-11-12T13:30:48.708Z",
  "blogType": {
    "en": "string",
    "ar": "string",
    "de": "string"
  },
  "sections": [
    {
      "id": 0,
      "sectionNumber": 0,
      "tittle": {
        "en": "string",
        "ar": "string",
        "de": "string"
      },
      "content": {
        "en": "string",
        "ar": "string",
        "de": "string"
      }
    }
  ]
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/Blogs/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/Blogs/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg5MjE3LCJleHAiOjE3OTQ0OTI4MTcsImlhdCI6MTc5NDQ4OTIxNywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IcbfILSw0hDcvmiek4GozCghlhcInaQ0WHPArDk9-Ng'
Request URL
https://realestate44.runasp.net/api/Blogs/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "title": "Top 5 Tips for Buying Your First Property",
    "imageUrl": "",
    "publishDate": "2026-11-10T13:33:23.889",
    "blogType": "Buying Guide",
    "sections": [
      {
        "id": 1,
        "sectionNumber": 1,
        "tittle": "Define Your Budget",
        "content": "Before starting your property search, determine your total budget. Consider the property price, taxes, maintenance fees, and any additional expenses. Having a clear budget will help you focus on properties that match your financial situation.",
        "imageUrl": "images/blogs/b2adad72-5695-48c2-9331-7fef73403040.webp"
      },
      {
        "id": 2,
        "sectionNumber": 2,
        "tittle": "Choose the Right Location",
        "content": "Location is one of the most important factors in real estate. Look for areas close to essential services, transportation, schools, and shopping centers. Also consider future development plans that may increase the property's value.",
        "imageUrl": ""
      },
      {
        "id": 3,
        "sectionNumber": 3,
        "tittle": "Inspect the Property",
        "content": "Always inspect the property before making a purchase decision. Check the construction quality, plumbing, electrical systems, finishing, and available facilities. A professional inspection can help you avoid unexpected problems.",
        "imageUrl": ""
      },
      {
        "id": 4,
        "sectionNumber": 4,
        "tittle": "Review the Legal Documents",
        "content": "Make sure all ownership documents, licenses, contracts, and permits are valid and complete. Consult a qualified legal professional to verify the property's legal status before signing any agreement.",
        "imageUrl": ""
      },
      {
        "id": 5,
        "sectionNumber": 5,
        "tittle": "Think About Future Value",
        "content": "A property can be both a home and a long-term investment. Research the area's market trends, rental demand, infrastructure projects, and expected development. These factors can help you make a smarter investment decision.",
        "imageUrl": ""
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 13:30:48 GMT 
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
  "title": "string",
  "imageUrl": "string",
  "publishDate": "2026-11-12T13:30:48.714Z",
  "blogType": "string",
  "sections": [
    {
      "id": 0,
      "sectionNumber": 0,
      "tittle": "string",
      "content": "string",
      "imageUrl": "string"
    }
  ]
}