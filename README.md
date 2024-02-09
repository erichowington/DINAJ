# Do I need a jacket?

The age old question that enters your head before you leave the house? Do I need a jacket?

Through geolocation, we'll let you know if you need a jacket.
(if you don't want us up in your business, enter your city).

Based on your location or city entered, we can determine if you do infact, need a jacket, and what kind of jacket you might need.


![alt text](http://images/DINAJ-MEDIA-QUERY.jpeg)



## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | db1ac38dac6827d5ace292718e7f7db1 |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | https://api.openweathermap.org/data/2.5/weather?q=city name&appid=API key|

