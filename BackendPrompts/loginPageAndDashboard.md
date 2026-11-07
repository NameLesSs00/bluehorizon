C:\Users\VIP\Desktop\work\bluehorizon\public\admin\Login\loginPageImage.png
here is a plan to create the login page for the admin it will be an image on the left and the login form on the right
note that after we login we should view the admin/dashboard and if we got a token and we try to view the login page we will be redircted to the dashboard
also if we don't have token we can't view any of the pages that is related to the admin expect the login and we should find a 404 not found page
here are how the backend works 
first the url is https://realestate22.runasp.net/


extra notes about the admin endpoints the edit you will find a phone but we can't show it so we will send it to be empty 11 zeros number as it will not be usefull and also we should have some great error handling showing the errors we got by the bakend and show it as a sonner component on the top center of hte page 
and the change password is for only the current user not every user 
could you create a full plan so that we have the UI plan and the Backend so that we use tanstack and also sonner and auixs and everything right ?

Admins


GET
/api/Admins


Parameters
Cancel
Name	Description
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
  'https://realestate22.runasp.net/api/Admins' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzNDIzLCJleHAiOjE3OTQwNDcwMjMsImlhdCI6MTc5NDA0MzQyMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IN32xfm4FjFH8fHbOYUSF__QqY-hMr6f2w_kcGm2M4Q'
Request URL
https://realestate22.runasp.net/api/Admins
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
      "id": "d2164eb7-0d05-407c-9035-0128ba8651f7",
      "username": "pola5samy55@gmail.com",
      "email": "pola5samy55@gmail.com",
      "createdAt": "2026-11-07T09:20:57.3563569"
    },
    {
      "id": "42eaf778-5752-431b-9087-fcb76945cd5d",
      "username": "admin@realestate.com",
      "email": "admin@realestate.com",
      "createdAt": "2026-11-01T16:44:13.4642487"
    },
    {
      "id": "43d0bac1-fcc2-4f03-ba8e-3a0aa1e78364",
      "username": "Mo@gmail.com",
      "email": "Mo@gmail.com",
      "createdAt": "2026-11-01T16:44:13.9783323"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:23:52 GMT 
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
      "id": "string",
      "username": "string",
      "email": "string",
      "createdAt": "2026-11-07T09:26:08.888Z"
    }
  ],
  "pageNumber": 0,
  "totalPages": 0,
  "totalCount": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links

PUT
/api/Admins/update


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "userName": "polasamy",
  "email": "pola5samy55@gmail.com",
  "phoneNumber": "123456789"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate22.runasp.net/api/Admins/update' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw' \
  -H 'Content-Type: application/json' \
  -d '{
  "userName": "polasamy",
  "email": "pola5samy55@gmail.com",
  "phoneNumber": "123456789"
}'
Request URL
https://realestate22.runasp.net/api/Admins/update
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "userName": "polasamy",
    "email": "pola5samy55@gmail.com",
    "phoneNumber": "123456789"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:26:08 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links
Auth


POST
/api/Auth/login


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "email": "pola5samy5@gmail.com",
  "password": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Auth/login' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzNDIzLCJleHAiOjE3OTQwNDcwMjMsImlhdCI6MTc5NDA0MzQyMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IN32xfm4FjFH8fHbOYUSF__QqY-hMr6f2w_kcGm2M4Q' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "pola5samy5@gmail.com",
  "password": "Pola123!"
}'
Request URL
https://realestate22.runasp.net/api/Auth/login
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MjQxNmM1My1kMThlLTRmYzQtYWI4Yi02NjFkYzgxMTQzNWUiLCJlbWFpbCI6InBvbGE1c2FteTVAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJwb2xhIHNhbXkiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3OTQwNDM1MjUsImV4cCI6MTc5NDA0NzEyNSwiaWF0IjoxNzk0MDQzNTI1LCJpc3MiOiJSZWFsRXN0YXRlQVBJIiwiYXVkIjoiUmVhbEVzdGF0ZUNsaWVudCJ9.ok3P1bvihx23ThQoUT1MHgLgzWHJvllGxr3e-xV9Fyw",
    "refreshToken": "cgqQaSyL8Y6pwMr1TgM7vQMZOUoZj9rp2k7H5U7wXEA=",
    "email": "pola5samy5@gmail.com",
    "fullName": "pola samy"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:25:25 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/logout


Parameters
Cancel
Reset
No parameters

Request body

application/json
"9vjHNJOhGvFF+35Zany+09XzZPmqz3zzw4JZk/zkEus="
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Auth/logout' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzMTQ0LCJleHAiOjE3OTQwNDY3NDQsImlhdCI6MTc5NDA0MzE0NCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.LR9jpxOuACc3I-miZ1rjq5Fx5Gf5M7gxTM_uqcX00yU' \
  -H 'Content-Type: application/json' \
  -d '"9vjHNJOhGvFF+35Zany+09XzZPmqz3zzw4JZk/zkEus="'
Request URL
https://realestate22.runasp.net/api/Auth/logout
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:19:36 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/add-admin


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "pola",
  "lastName": "samy",
  "email": "pola5samy5@gmail.com",
  "password": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Auth/add-admin' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzNDIzLCJleHAiOjE3OTQwNDcwMjMsImlhdCI6MTc5NDA0MzQyMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IN32xfm4FjFH8fHbOYUSF__QqY-hMr6f2w_kcGm2M4Q' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "pola",
  "lastName": "samy",
  "email": "pola5samy5@gmail.com",
  "password": "Pola123!"
}'
Request URL
https://realestate22.runasp.net/api/Auth/add-admin
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": "42416c53-d18e-4fc4-ab8b-661dc811435e",
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:25:02 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/Auth/update-password


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "oldPassword": "Pola123!",
  "newPassword": "Pola123!!",
  "confirmPassword": "Pola123!!"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://realestate22.runasp.net/api/Auth/update-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkMjE2NGViNy0wZDA1LTQwN2MtOTAzNS0wMTI4YmE4NjUxZjciLCJlbWFpbCI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoicG9sYSBzYW15Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzk0MDQzMzMzLCJleHAiOjE3OTQwNDY5MzMsImlhdCI6MTc5NDA0MzMzMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.DMa4b-Y5lF7wt-OtDN9BpmVdB6O_rm2DvYHG-qVxHPw' \
  -H 'Content-Type: application/json' \
  -d '{
  "oldPassword": "Pola123!",
  "newPassword": "Pola123!!",
  "confirmPassword": "Pola123!!"
}'
Request URL
https://realestate22.runasp.net/api/Auth/update-password
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:22:24 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/Auth/delete-admin/{id}


Parameters
Cancel
Name	Description
id *
string
(path)
d2164eb7-0d05-407c-9035-0128ba8651f7
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://realestate22.runasp.net/api/Auth/delete-admin/d2164eb7-0d05-407c-9035-0128ba8651f7' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzNDIzLCJleHAiOjE3OTQwNDcwMjMsImlhdCI6MTc5NDA0MzQyMywiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.IN32xfm4FjFH8fHbOYUSF__QqY-hMr6f2w_kcGm2M4Q'
Request URL
https://realestate22.runasp.net/api/Auth/delete-admin/d2164eb7-0d05-407c-9035-0128ba8651f7
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
 date: Sat,07 Nov 2026 09:24:44 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/Auth/refresh-token


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "refreshToken": "FpKNhXi+tDk9Kka4aIITyB644VLo9d8otIpn3ptUHM0="
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://realestate22.runasp.net/api/Auth/refresh-token' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzMTgwLCJleHAiOjE3OTQwNDY3ODAsImlhdCI6MTc5NDA0MzE4MCwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.6iRGUBqay5Nie41HTJUVVLX2sI6B1RxRUvi5ltWPobU' \
  -H 'Content-Type: application/json' \
  -d '{
  "refreshToken": "FpKNhXi+tDk9Kka4aIITyB644VLo9d8otIpn3ptUHM0="
}'
Request URL
https://realestate22.runasp.net/api/Auth/refresh-token
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0M2QwYmFjMS1mY2MyLTRmMDMtYmE4ZS0zYTBhYTFlNzgzNjQiLCJlbWFpbCI6Ik1vQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiTW9oYW1lZCBIYWtlbSIsInJvbGUiOiJTdXBlckFkbWluIiwibmJmIjoxNzk0MDQzMjA1LCJleHAiOjE3OTQwNDY4MDUsImlhdCI6MTc5NDA0MzIwNSwiaXNzIjoiUmVhbEVzdGF0ZUFQSSIsImF1ZCI6IlJlYWxFc3RhdGVDbGllbnQifQ.-2HgIPIucaCqv0HJPisCzK5_eBZefy_PITaGHxIIzvU",
    "refreshToken": "FIFqhPEHR3n9SCz39ze2Qo4U1kC9oLd3IupsRRVl+8A=",
    "email": "Mo@gmail.com",
    "fullName": "Mohamed Hakem"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,07 Nov 2026 09:20:05 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK