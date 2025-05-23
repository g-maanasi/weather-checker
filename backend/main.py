from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

import uvicorn
import openmeteo_requests
import requests_cache
import pandas as pd
from pydantic import BaseModel
from retry_requests import retry
import json
import sqlite3
import bcrypt
import secrets

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)
url = "https://api.open-meteo.com/v1/forecast" 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_conn():
    conn = sqlite3.connect('weather.db')
    return conn
 
@app.get("/")
def test():
    return RedirectResponse(url="/api")

#####################
# WEATHER FUNCTIONS #
#####################
class WeatherOptions(BaseModel):
    latitude: int = 52.52
    longtitude: int = 13.41
    wind_speed_unit: str = "mph"
    temperature_unit: str = "fahrenheit"

@app.post("api/weather/{location}")
def weather_page(options: WeatherOptions = None):
    if options is None:
        options = WeatherOptions()
    
    return {
        "location": options.latitude,
        "forecast_days": options.longtitude,
        "wind_speed_unit": options.wind_speed_unit,
        "temperature_unit": options.temperature_unit
    }


def get_weather(latitude, longitude, speed_unit, temperature_unit):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": ["temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min"],
        "hourly": ["temperature_2m", "precipitation", "precipitation_probability", "apparent_temperature", "snow_depth"],
        "wind_speed_unit": speed_unit,
        "temperature_unit": temperature_unit,
	    "precipitation_unit": "inch"
    }
    responses = openmeteo.weather_api(url, params=params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]
    print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
    print(f"Elevation {response.Elevation()} m asl")
    print(f"Timezone {response.Timezone()}{response.TimezoneAbbreviation()}")
    print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")


################################
# SIGN UP AND LOG IN FUNCTIONS #
################################
class SignUpInfo(BaseModel):
    first_name: str = "John"
    last_name: str = "Smith"
    email: str = "example@gmail.com"
    password: str = "abcd"
    role: str = "user"

class LoginInfo(BaseModel):
    email: str | None
    password: str | None

@app.post('/api/signup')
def signup(user_info: SignUpInfo, response: Response):
    if not user_info:
        return {'success': False, 'reason': 'no user information'}
    
    # Encrypt the password
    password = password.encode('utf-8')
    salt = bcrypt.gensalt(rounds=12)
    password_hash = bcrypt.hashpw(password, salt)

    conn = get_conn()
    cursor = conn.cursor()

    # Check if email is already in the table
    result = cursor.execute("SELECT * FROM users WHERE email=?;", (user_info.email,))
    if result:
        conn.close()
        return {'success': False, 'reason': 'email already exists'}

    # Insert data into the users table
    query = '''INSERT INTO users (first_name, last_name, email, role, password_hash, salt) VALUES (?,?,?,?,?,?);'''
    cursor.execute(query, (user_info.first_name, user_info.last_name, user_info.email, user_info.role, password_hash, salt))

    # Add user to cookies with time limit
    response.set_cookie(
        key="email",
        value=user_info.email,
        max_age=86400,
        httponly=True,
        secure=True,
        samesite="lax"
    )

    # Close connection and return success
    conn.close()
    return {'success': True, 'reason':  None}

@app.post('/api/login')
def login(user_info: SignUpInfo, response: Response):
    if not user_info or not user_info.email or not user_info.password:
        return {'success': False, 'reason': 'no user information'}
    
    conn = get_conn()
    cursor = conn.cursor()

    # Check if the email is in the table and encrypt the password to see if it matches
    query = '''SELECT password_hash, salt FROM users WHERE email=?;'''
    result = cursor.execute(query, (user_info.email,))

    if not result:
        conn.close()
        return {'success': False, 'reason': "Email doesn't exist"}
    
    salt = result[0]['salt']
    password_hash = result[0]['password_hash']
    current_pass_attempt = user_info.password.encode('utf-8')
    current_pass_attempt = bcrypt.hashpw(current_pass_attempt, salt)

    if current_pass_attempt == password_hash:
        # Add user to cookies
        response.set_cookie(
            key="email",
            value=user_info.email,
            max_age=86400,
            httponly=True,
            secure=True,
            samesite="lax"
        )

        conn.close()
        return {'success': True, 'reason': None}
    
    conn.close()
    return {'success': False, 'reason': "password hash did not match"}