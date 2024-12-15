from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from pyngrok import ngrok
import uvicorn
import nest_asyncio
from fastapi.middleware.cors import CORSMiddleware

# Configure Google Generative AI
genai.configure(api_key="AIzaSyBnoS7nX8mIhvuo5H1s9ZOCw5nSyfMMgnk")

# Initialize FastAPI app
app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input schema for patient data
class PatientData(BaseModel):
    Name: str
    Age: int
    Gender: str
    Phone: str
    Existing_Conditions: str
    Allergies: str
    Past_Surgeries: str
    Ongoing_Diseases: str
    Medications: str
    Lab_Results: str
    Medical_Imaging_Files: str
    Consent: str
    Transplant: str  # Added field

# Output schema for the response
class MedicalReportResponse(BaseModel):
    medical_report: str
    transplant_needed: bool

# POST endpoint for generating a detailed medical report
@app.post("/generate_detailed_report/", response_model=MedicalReportResponse)
async def generate_report(data: PatientData):
    try:
        print("Received data:", data.dict())  # Debugging
        prompt = f"""
        Generate a detailed medical report for the following patient:

        Name: {data.Name}
        Age: {data.Age}
        Gender: {data.Gender}
        Phone: {data.Phone}
        Existing Conditions: {data.Existing_Conditions}
        Allergies: {data.Allergies}
        Past Surgeries: {data.Past_Surgeries}
        Ongoing Diseases: {data.Ongoing_Diseases}
        Medications: {data.Medications}
        Lab Results: {data.Lab_Results}
        Medical Imaging Files: {data.Medical_Imaging_Files}
        Consent: {data.Consent}
        Transplant: {data.Transplant}

        Provide detailed recommendations based on the above and determine if the patient needs a transplant.
        """

        # Generate the response using the Gemini model
        response = genai.generate_text(
            model="gemini-1.5-flash",
            prompt=prompt,
            temperature=0.7  # Adjust as needed
        )

        # Parse AI response to determine if transplant is needed
        transplant_needed = "transplant is needed" in response.result.lower()

        return {
            "medical_report": response.result,
            "transplant_needed": transplant_needed,
        }

    except Exception as e:
        print("Error:", str(e))  # Debugging
        raise HTTPException(status_code=500, detail=str(e))

# Run the app locally
if __name__ == "__main__":
    nest_asyncio.apply()
    public_url = ngrok.connect(8000).public_url
    print(f"Public URL: {public_url}")
    uvicorn.run(app, host="0.0.0.0", port=8000)
