from fastapi import APIRouter
from models import Employee
from services.employee_service import (
    create_employee_service,
    get_employees_service,
    delete_employee_service
)

router = APIRouter()


@router.post("/employees")
async def create_employee(employee: Employee):
    return await create_employee_service(employee)


@router.get("/employees")
async def get_employees():
    return await get_employees_service()


@router.delete("/employees/{employee_id}")
async def delete_employee(employee_id: str):
    return await delete_employee_service(employee_id)
