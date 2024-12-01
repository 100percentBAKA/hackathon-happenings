from pydantic import BaseModel
from typing import List, Optional, Any
from enum import Enum


class FileType(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    TXT = "txt"


# class InputFile(BaseModel):
#     content: str
#     file_type: FileType


class Resolution(BaseModel):
    width: int
    height: int

class AdGenerationRequest(BaseModel):
    doc_detail: str
    region: List[str]
    resolution: Resolution


class GeneratedAd(BaseModel):
    image_urls: List[str]
    metadata: dict
