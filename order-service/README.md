# Serverless test task

## Order service

Order service is a service for creating and managing orders. On this service we can:
- Create an order: [POST] `/order`
- Update an order: [PUT] `/order/:uuid`
- Get an order: [GET] `/order/:uuid`
- Delete an order: [DELETE] `/order/:uuid`
- Get all orders: [GET] `/orders`
---
### Order schem:
```javascript
{
    "uuid": "dedc4bfa-e242-43c7-835c-9f32317585bc", // Unique identification for order
    "name": "Order Name", // Order name
    "amount": 12, // Amount of the order
    "status": "SUCCESS", // Current order status (Can be: SUCCESS | FAILED | IN_PROGRESS)
    "createdAt": 1629965657, // Created date UNIX timestamp
    "updatedAt": 1629965671 // Updated date UNIX timestamp
}
```
---
### Endpoins:

#### Create an order: **[POST]** `/order`   
Body:
```javascript
{
    "uuid": "dedc4bfa-e242-43c7-835c-9f32317585bc", // Unique identification for order
    "name": "Order Name", // Order name
    "amount": 12, // Amount of the order
}
```
Response:
```javascript
{
    "orderId": "dedc4bfa-e242-43c7-835c-9f32317585bc",
    "successful": true,
    "type": "create"
}
```

#### Update an order: **[PUT]** `/order/:uuid`
Body:
```javascript
{
    "name": "Order Name", // (Optional) Order name
    "amount": 12, // (Optional) Amount of the order
    "status": "SUCCESS" // (Optional) Current order status (Can be: SUCCESS | FAILED | IN_PROGRESS)
}
```
Response:
```javascript
{
    "orderId": "dedc4bfa-e242-43c7-835c-9f32317585bc",
    "successful": true,
    "type": "update"
}
```

####  Delete an order: **[DELETE]** `/order/:uuid`

Response:
```javascript
{
    "orderId": "dedc4bfa-e242-43c7-835c-9f32317585bc",
    "successful": true,
    "type": "delete"
}
```

#### Get an order: **[GET]** `/order/:uuid`
Response:
```javascript
{
    "updatedAt": 1629965671,
    "status": "SUCCESS",
    "amount": 123,
    "createdAt": 1629965657,
    "uuid": "5c2d1f58-ec58-49b2-ac50-d789bccf130b",
    "name": "Test"
}
```

#### Get all orders: **[GET]** `/orders`
Response:
```javascript
[
    {
        "updatedAt": 1629965671,
        "status": "SUCCESS",
        "amount": 123,
        "createdAt": 1629965657,
        "uuid": "5c2d1f58-ec58-49b2-ac50-d789bccf130b",
        "name": "Test"
    },
    {
        "updatedAt": 1629960914,
        "status": "FAILED",
        "amount": 123,
        "createdAt": 1629960853,
        "uuid": "51af71ef-a313-42fb-ac3a-bc868033313c",
        "name": "Test"
    }
]
```

---
## Deploy

1) Follow the instructions below to set up your AWS account to deploy. [Tutorial](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)

2) Deploy Order service:  
`cd order-service`   
`sls deploy`

3) Deploy Status service:   
`cd status-service`   
`sls deploy`

