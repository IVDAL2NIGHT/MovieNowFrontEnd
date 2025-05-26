import axios from 'axios';

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiTW92aWVOb3ciLCJpZCI6IjY4MzM1N2FkNjlhN2NjMDRiMzUzZjJhMyIsImV4cCI6MTc0ODIzNDc4NiwiaWF0IjoxNzQ4MjMxMTg2LCJlbWFpbCI6ImNhcmxvczExMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxvczExMTEifQ.HLxYwNOlKNA-_1HPq73x9ut6pb00fwPH5BbjUAmdZWY"
export default axios.create({
  baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
         }
    });