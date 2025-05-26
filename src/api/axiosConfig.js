import axios from 'axios';

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiTW92aWVOb3ciLCJpZCI6IjY4MzM1N2FkNjlhN2NjMDRiMzUzZjJhMyIsImV4cCI6MTc0ODIxOTE3NiwiaWF0IjoxNzQ4MjE1NTc2LCJlbWFpbCI6ImNhcmxvczExMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxvczExMTEifQ.-smh-3hbhFBm7536ARX2cOQzOh1GMnBlFFgBEanJ4_E"
export default axios.create({
  baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
         }
    });