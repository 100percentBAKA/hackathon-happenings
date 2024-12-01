from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ...models.schemas import AdGenerationRequest, GeneratedAd
from ...core.utils.file_processor import FileProcessor
from pydantic import BaseModel
from ...core.agents.trend_agent import TrendAgent
# from ...core.agents.image_agent import ImageAgent
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_groq import ChatGroq

from langchain_aws import ChatBedrock
from langchain_core.prompts import PromptTemplate

from operator import imod

# together import
from together import Together

from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()
file_processor = FileProcessor()

# trend_agent = TrendAgent()

class ImageInput(BaseModel):
    title: str
    brief_description: str
    primary_colors: str
    location: str
    brand_tagline: str
    headline_font: str = "Proxima Nova Bold"
    cta: str = "Order Now"
    key_features: str
    target_audience: str = "Diverse group of young adults (21-45)"
    disclaimer: str = "Delivery times may vary"
    notes: str = "Minimize text in image and use modern, minimalistic UI"

# class ExtractRequest(BaseModel):
#     regions: str = 'bengaluru'

@router.post("/extract")
async def extract_data(
    region: str = Form(...) ,  # Request body parameter
    doc_detail: UploadFile = File(...),  # File parameter
):
    """
    Extract text from uploaded files and process them.

    Args:
        guidelines (UploadFile): Guidelines document
        brand_metadata (UploadFile): Brand metadata document
        campaign_details (UploadFile): Campaign details document
        design_plan (UploadFile): Design plan document
        region (str): Region information
    """
    try:
        region_list = [r.strip() for r in region.split('||')]
        processed_data = {
            "doc_detail": await file_processor.process_file(doc_detail),
            # "brand_metadata": await file_processor.process_file(brand_metadata),
            # "campaign_details": await file_processor.process_file(campaign_details),
            # "design_plan": await file_processor.process_file(design_plan),
            "region": region_list,
        }
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/generate-ad", response_model=GeneratedAd)
async def generate_ad(data: AdGenerationRequest):
    # model = ChatBedrock(
    #     model="anthropic.claude-3-5-sonnet-20240620-v1:0",
    #     beta_use_converse_api=True,
    #     region="us-west-2", 
    # )

    model = ChatGroq(temperature=0, model_name="llama-3.2-3b-preview")

    image_client = Together(api_key="")

    # prompt = PromptTemplate.from_template(
    #     "I shall be providing you with Campaign details, Company guidelines, and Brand details, I want you to use these details and return only the output in the following specified structure. The result should be as consice and compact as possible "
    #     "\nCampaign details, Company guidelines, and Brand details:\n{doc_detail}\n\n"
    #     "Output structured format:\n"
    #     "- Image Title:\n"
    #     "- Brief Description:\n"
    #     "- Primary Colors:\n"
    #     "- Location: {location}\n"
    #     "- Brand Tagline:\n"
    #     "- Headline Font: Proxima Nova Bold\n"
    #     "- CTA: Order Now\n"
    #     "- Key Features:\n"
    #     "- Target Audience: Diverse group of young adults (21-45)\n"
    #     "- Disclaimer: Delivery times may vary\n\n"
    #     "Notes:\n"
    #     "- Keep texts in image very less and use only when needed\n"
    #     "- Use modern, minimalistic UI"
    # )

    # prompt = PromptTemplate.from_template(
    #     "I shall be providing you with Campaign details, Company guidelines, and Brand details, I want you to use these details and return only the output in the following specified structure. The result should be as consice and compact as possible "
    #     "\nCampaign details, Company guidelines, and Brand details:\n{doc_detail}\n\n"
    #     "\nAlso please follow the resolution provided by the company while generating the adds:\n{resolution}\n\n"
    #     "\nYou have been asked to produce a description or prompt which would be passed to an image generation model"
    #     "\nInstruct the image generation model to keep the image in accordance to the location provided to you, and also limit the texts on the image as minimum as possible"
    #     "\nKeep the design aesthetic and modern looking with great UI"
    # )

    urls = []

    for loc in data.region:
        catchy_prompt = PromptTemplate.from_template(
            "Generate a catchy phrase having no more than 10 words"
            "\nwitty phrase must be about {doc_detail}"
            "\nphrase must be witty"
            "\nit must be about the location: {location}"
            "\nthere must not be any other text nor any explanation"
        )

        formatted_catchy_prompt = catchy_prompt.format(
            location=loc,
            doc_detail=data.doc_detail
        )

        catchy_response = model.invoke(formatted_catchy_prompt)

        # print(f"catchy line: {catchy_response.content}\n")

        prompt = PromptTemplate.from_template(
            "Generate an appealing prompt for a company using its brand guidelines, campaign details, and logo (use the provided logo or source it online). "
            "\nNote that I would be passing this prompt to an image generator"
            "\nMake sure that the image generator uses the following contents"
            "\nGive prompt to include only the Catchy line in the image: {catchy_lines}"
            "\nAdditional details:"
            "\nDetails: {doc_detail}"
            "\nTargetted Audience are located in: {location}"
        )

        formatted_prompt = prompt.format(
            doc_detail=data.doc_detail,
            location=loc,
            catchy_lines=catchy_response.content
        )

        llm_response = model.invoke(formatted_prompt)

        # print(f"llm content: {llm_response.content}\n")

        # # print(data.resolution.height)
        # # print(data.resolution.width)

        response = image_client.images.generate(
            prompt=llm_response.content, model="black-forest-labs/FLUX.1-dev", steps=50, n=1,
            height=data.resolution.height,
            width=data.resolution.width
        )

        for item in response.data:
            if hasattr(item, 'url'):
                urls.append(item.url)

    return {"image_urls": urls, "metadata": {}}


@router.post("/generate-ads", response_model=GeneratedAd)
async def generate_ad(data: AdGenerationRequest):
    # Initialize the TrendAgent
    trend_agent = TrendAgent()
    image_client = Together(api_key="")


    urls = []

    for loc in data.region:
        # Analyze trends
        try:
            trend_data = await trend_agent.analyze_trends(
                guidelines="Company branding guidelines",  # You may update this if necessary
                region=loc,
                campaign_details=data.doc_detail,
            )
            print(f"Trend Analysis Data for {loc}: {trend_data}")
        except Exception as e:
            print(f"Error analyzing trends for {loc}: {e}")
            trend_data = {}

        # Generate a catchy phrase
        catchy_prompt = (
            f"Generate a catchy phrase about '{data.doc_detail}' "
            f"for the region '{loc}' considering trends: {trend_data.get('market_trends', [])}. "
            f"Make it witty, concise, and under 10 words."
        )

        catchy_response = trend_agent._invoke_groq_model(catchy_prompt)
        print(f"Catchy line for {loc}: {catchy_response}\n")

        # Generate image description prompt
        image_prompt = (
            f"Create a prompt for an image generation tool. Use:\n"
            f"make sure to include the company's brand as per the given specification:\n"

            f"Catchy Line: {catchy_response} (select on of it)\n"
            f"Trends Insights: {trend_data.get('market_trends', [])}\n"
            f"Campaign Details: {data.doc_detail}\n"
            f"Location: {loc}.\n"
            f"Focus on modern aesthetics and minimalistic UI."
        )

        llm_response = trend_agent._invoke_groq_model(image_prompt)
        print(f"Image Prompt for {loc}: {llm_response}\n")

        # Generate the image
        try:
            response = image_client.images.generate(
                prompt=llm_response,
                model="black-forest-labs/FLUX.1-dev",
                steps=50,
                n=1,
                height=data.resolution.height,
                width=data.resolution.width,
            )

            for item in response.data:
                if hasattr(item, "url"):
                    urls.append(item.url)
        except Exception as e:
            print(f"Error generating image for {loc}: {e}")

    return {"image_urls": urls, "metadata": {}}
   