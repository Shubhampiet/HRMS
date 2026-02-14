from pydantic import BaseModel, EmailStr
from datetime import date

class Employee(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    department: str

class Attendance(BaseModel):
    employee_id: str
    date: str
    Attendance_status: str
