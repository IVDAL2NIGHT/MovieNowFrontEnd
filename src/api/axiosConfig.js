import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiTW92aWVOb3ciLCJpZCI6IjY4MzM1N2FkNjlhN2NjMDRiMzUzZjJhMyIsImV4cCI6MTc0ODI3MjYyNCwiaWF0IjoxNzQ4MjY5MDI0LCJlbWFpbCI6ImNhcmxvczExMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxvczExMTEifQ.upkRXUmr_c2lix3FyClMkEIbNjSHPlFHGBfr8q9fA70"
const decoded = jwtDecode(token);
export const username = decoded.username;
export default axios.create({
  baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
         }
    });