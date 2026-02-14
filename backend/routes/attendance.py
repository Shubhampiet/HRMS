from fastapi import APIRouter
from models import Attendance
from services.attendance_service import (
    mark_attendance_service,
    get_attendance_service
)

router = APIRouter()


@router.post("/attendance")
async def mark_attendance(attendance: Attendance):
    return await mark_attendance_service(attendance)


@router.get("/attendance/{employee_id}")
async def get_attendance(employee_id: str):
    return await get_attendance_service(employee_id)
