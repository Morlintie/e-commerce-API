# E-Commerce-API API Documentation

## Auth

### Sign Up

**Method:** `POST`
**URL:** `{{URL}}/auth/signup`

**Request Body:**

```json
{
  "name": "susan",
  "email": "susan@gmail.com",
  "password": "secret"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Login

**Method:** `POST`
**URL:** `{{URL}}/auth/login`

**Request Body:**

```json
{
  "email": "john@gmail.com",
  "password": "secret"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Logout

**Method:** `GET`
**URL:** `{{URL}}/auth/logout`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

## User

### Get All Users

**Method:** `GET`
**URL:** `{{URL}}/user`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Show User

**Method:** `GET`
**URL:** `{{URL}}/user/show/1234`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Update Password

**Method:** `PATCH`
**URL:** `{{URL}}/user/password`

**Request Body:**

```json
{
  "oldPassword": "secret",
  "newPassword": "anothersecret"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get Single User

**Method:** `GET`
**URL:** `{{URL}}/user/67efcdeb771bec07019908bf`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Update User

**Method:** `PATCH`
**URL:** `{{URL}}/user/67efcdeb771bec07019908bf`

**Request Body:**

```json
{
  "name": "mehmet",
  "email": "mehmet@gmail.com"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Delete User

**Method:** `DELETE`
**URL:** `{{URL}}/user/67effb3fe75bddbcc1e99cb5`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

## Product

### Get All Products

**Method:** `GET`
**URL:** `{{URL}}/product`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Post Product

**Method:** `POST`
**URL:** `{{URL}}/product`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get Single Product

**Method:** `GET`
**URL:** `{{URL}}/product/67f131edeed4855130a7a436`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Update Single Product

**Method:** `PATCH`
**URL:** `{{URL}}/product/67f044f19909a8819a2f024b`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Delete Single Product

**Method:** `DELETE`
**URL:** `{{URL}}/product/67f12795bd44b9bd93a8a141`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

## Review

### Get All Reviews

**Method:** `GET`
**URL:** `{{URL}}/review`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get One User's Reviews

**Method:** `GET`
**URL:** `{{URL}}/review/user/67f029274d63d3b995d9a281`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get One Product's Reviews

**Method:** `GET`
**URL:** `{{URL}}/review/product/67f130c12be91bc6fca9039f`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get One Review

**Method:** `GET`
**URL:** `{{URL}}/review/67f10189c93a6302b017070b`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Post Review

**Method:** `POST`
**URL:** `{{URL}}/review`

**Request Body:**

```json
{
  "rating": "3",
  "title": "Its OK",
  "comment": "This guy thougth JS good",
  "product": "67f13300eed4855130a7a440"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Update Review

**Method:** `PATCH`
**URL:** `{{URL}}/review/67f12be99d51dba4bf6433ab`

**Request Body:**

```json
{
  "rating": "3"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Delete Review

**Method:** `DELETE`
**URL:** `{{URL}}/review/67f12e9e1f57a878e5bb1fd0`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

## Order

### Get All Orders

**Method:** `GET`
**URL:** `{{URL}}/order`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get Single Order

**Method:** `GET`
**URL:** `{{URL}}/order/67f15ccdac144aeb034b8cbb`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get User's Orders

**Method:** `GET`
**URL:** `{{URL}}/order/user/67f029274d63d3b995d9a281`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Get Product's Order

**Method:** `GET`
**URL:** `{{URL}}/order/product/67f13377eed4855130a7a444`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Post Order

**Method:** `POST`
**URL:** `{{URL}}/order`

**Request Body:**

```json
{
  "tax": "5000",
  "shippingFee": "2000",
  "cartItems": [
    {
      "name": "TestDaf Vorbereitung Zettel",
      "image": "https://res.cloudinary.com/dppjlhdth/image/upload/v1743860207/File%20upload/q6kz2abxhax4imjgozhz.png",
      "price": "12327",
      "amount": "2",
      "product": "67f131edeed4855130a7a436"
    },
    {
      "name": "TestDaf Vorbereitung Zettel",
      "image": "https://res.cloudinary.com/dppjlhdth/image/upload/v1743860207/File%20upload/q6kz2abxhax4imjgozhz.png",
      "price": "12327",
      "amount": "2",
      "product": "67f13377eed4855130a7a444"
    }
  ]
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Update Order

**Method:** `PATCH`
**URL:** `{{URL}}/order/67f1497b4da486d609632049`

**Request Body:**

```json
{
  "paymentIntentId": "12345"
}
```

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```

### Delete Order

**Method:** `DELETE`
**URL:** `{{URL}}/order/67f1624454ee591bc8aba614`

**Example Response:**

```json
{
  "status": "success",
  "data": "Example response data here."
}
```
