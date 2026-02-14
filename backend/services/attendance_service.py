from fastapi import HTTPException
from database import db

async def mark_attendance_service(attendance):

    # Check employee exists
    employee = await db.employees.find_one(
        {"employee_id": attendance.employee_id}
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Update or insert
    await db.attendance.update_one(
        {
            "employee_id": attendance.employee_id,
            "date": attendance.date
        },
        {
            "$set": attendance.dict()
        },
        upsert=True
    )

    return {"message": "Attendance recorded"}


async def get_attendance_service(employee_id: str):

    records = []

    async for record in db.attendance.find(
        {"employee_id": employee_id}
    ):
        record["_id"] = str(record["_id"])
        records.append(record)

    return records
