we should create the moudle for the payment plan it will be viewed on the projects only it will not have it's own page and in it we have two types Cash and Installment note that if the Cash we don't have to put the data for "downPaymentAmountUSD": 0,
  "installmentYears": 0,
  "installmentMonths": 0,
just like the example but when we make it Installment we should put those data okay could you create a full plan so that we could add those to our projects so that it works right and greate please createa a plan for it 
status Sold
Status
integer($int32)
(query)
Available values : 0, 1
0 is Approved and 1 is Sold

PaymentPlans


GET
/api/projects/{projectId}/payment-plans


Parameters
Cancel
Name	Description
projectId *
integer($int32)
(path)
3
PaymentType
string
(query)
PaymentType
Status
integer($int32)
(query)

--
SearchTerm
string
(query)
SearchTerm
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
Currency
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
  'https://realestate44.runasp.net/api/projects/3/payment-plans' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg5MjE3LCJleHAiOjE3OTQ0OTI4MTcsImlhdCI6MTc5NDQ4OTIxNywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IcbfILSw0hDcvmiek4GozCghlhcInaQ0WHPArDk9-Ng'
Request URL
https://realestate44.runasp.net/api/projects/3/payment-plans
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
        "projectId": 3,
        "projectName": "Palm Residence",
        "commissionRate": 10,
        "installmentMonths": 0,
        "paymentType": "Cash",
        "status": "Approved",
        "downPayment": null,
        "createdBy": "Mo@gmail.com",
        "createdAt": "2026-11-12T13:14:12.5291271",
        "updatedBy": null,
        "updatedAt": null
      },
      {
        "id": 1,
        "projectId": 3,
        "projectName": "Palm Residence",
        "commissionRate": 2.5,
        "installmentMonths": 0,
        "paymentType": "Installment",
        "status": "Sold",
        "downPayment": {
          "usd": 15000,
          "eur": null,
          "egp": null,
          "gbp": null
        },
        "createdBy": "admin@realestate.com",
        "createdAt": "2026-11-10T13:55:42.1130157",
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
 date: Thu,12 Nov 2026 13:14:17 GMT 
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
      "projectId": 0,
      "projectName": "string",
      "commissionRate": 0,
      "installmentMonths": 0,
      "paymentType": "string",
      "status": "string",
      "downPayment": {
        "usd": 0,
        "eur": 0,
        "egp": 0,
        "gbp": 0
      },
      "createdBy": "string",
      "createdAt": "2026-11-12T13:14:44.618Z",
      "updatedBy": "string",
      "updatedAt": "2026-11-12T13:14:44.618Z"
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
/api/projects/{projectId}/payment-plans


Parameters
Cancel
Reset
Name	Description
projectId *
integer($int32)
(path)
3
Request body

application/json
{
  "paymentType": "Cash",
  "downPaymentAmountUSD": 0,
  "installmentYears": 0,
  "installmentMonths": 0,
  "commissionRate": 10,
  "status": 0
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate44.runasp.net/api/projects/3/payment-plans' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg5MjE3LCJleHAiOjE3OTQ0OTI4MTcsImlhdCI6MTc5NDQ4OTIxNywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IcbfILSw0hDcvmiek4GozCghlhcInaQ0WHPArDk9-Ng' \
  -H 'Content-Type: application/json' \
  -d '{
  "paymentType": "Cash",
  "downPaymentAmountUSD": 0,
  "installmentYears": 0,
  "installmentMonths": 0,
  "commissionRate": 10,
  "status": 0
}'
Request URL
https://realestate44.runasp.net/api/projects/3/payment-plans
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
 date: Thu,12 Nov 2026 13:14:12 GMT 
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
  "data": 0
}
No links

GET
/api/projects/{projectId}/payment-plans/{id}


Parameters
Cancel
Name	Description
projectId *
integer($int32)
(path)
3
id *
integer($int32)
(path)
2
currency
string
(query)
USD
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://realestate44.runasp.net/api/projects/3/payment-plans/2?currency=USD' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNDRkM2M2My1lZTY2LTQ2ZWYtYjY0Ny1kNzY2NzdlNDgwYzYiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0NDg5MjE3LCJleHAiOjE3OTQ0OTI4MTcsImlhdCI6MTc5NDQ4OTIxNywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IcbfILSw0hDcvmiek4GozCghlhcInaQ0WHPArDk9-Ng'
Request URL
https://realestate44.runasp.net/api/projects/3/payment-plans/2?currency=USD
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
    "projectId": 3,
    "projectName": "Palm Residence",
    "commissionRate": 10,
    "installmentMonths": 0,
    "paymentType": "Cash",
    "status": "Approved",
    "downPayment": null,
    "createdBy": "Mo@gmail.com",
    "createdAt": "2026-11-12T13:14:12.5291271",
    "updatedBy": null,
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,12 Nov 2026 13:14:40 GMT 
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
  "projectId": 0,
  "projectName": "string",
  "commissionRate": 0,
  "installmentMonths": 0,
  "paymentType": "string",
  "status": "string",
  "downPayment": {
    "usd": 0,
    "eur": 0,
    "egp": 0,
    "gbp": 0
  },
  "createdBy": "string",
  "createdAt": "2026-11-12T13:14:44.628Z",
  "updatedBy": "string",
  "updatedAt": "2026-11-12T13:14:44.628Z"
}
No links

PUT
/api/projects/{projectId}/payment-plans/{id}


Parameters
Try it out
Name	Description
projectId *
integer($int32)
(path)
projectId
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
  "projectId": 0,
  "paymentType": "string",
  "downPaymentAmountUSD": 0,
  "installmentYears": 0,
  "installmentMonths": 0,
  "commissionRate": 0,
  "status": 0
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
No links

DELETE
/api/projects/{projectId}/payment-plans/{id}


Parameters
Try it out
Name	Description
projectId *
integer($int32)
(path)
projectId
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
  "succeeded": true,
  "errors": [
    "string"
  ],
  "data": true
}