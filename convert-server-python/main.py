from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
import os
from docx2pdf import convert

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/upload")
async def read_item(file: UploadFile = File(...)):
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    converted_dir = "converted"
    os.makedirs(converted_dir, exist_ok=True)
    converted_file_location = os.path.join(
        converted_dir, f"{file.filename}.pdf")

    convert(file_location, converted_file_location)

    return FileResponse(path=converted_file_location)
