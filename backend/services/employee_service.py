from fastapi import HTTPException
from database import db


# CREATE EMPLOYEE
async def create_employee_service(employee):

    # Check if employee already exists
    existing = await db.employees.find_one(
        {"employee_id": employee.employee_id}
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Employee already exists"
        )

    await db.employees.insert_one(employee.dict())

    return {"message": "Employee created"}


# GET ALL EMPLOYEES
async def get_employees_service():

    employees = []

    async for emp in db.employees.find():
        emp["_id"] = str(emp["_id"])
        employees.append(emp)

    return employees


# DELETE EMPLOYEE
async def delete_employee_service(employee_id: str):

    result = await db.employees.delete_one(
        {"employee_id": employee_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {"message": "Employee deleted"}
