import axios from 'axios';

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiTW92aWVOb3ciLCJpZCI6IjY4MzM1N2FkNjlhN2NjMDRiMzUzZjJhMyIsImV4cCI6MTc0ODIzMjE4NSwiaWF0IjoxNzQ4MjI4NTg1LCJlbWFpbCI6ImNhcmxvczExMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxvczExMTEifQ.1vM5apJmHPd7AMEgEjWnpYxpw3mTyPW_eKDyCHPcIWY"
export default axios.create({
  baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
         }
    });