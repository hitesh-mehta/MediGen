from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from pyngrok import ngrok
import uvicorn
import nest_asyncio
from fastapi.middleware.cors import CORSMiddleware

# Configure Google Generative AI
genai.configure(api_key="AIzaSyBnoS7nX8mIhvuo5H1s9ZOCw5nSyfMMgnk")  # Replace with your valid API key

# Initialize the Gemini 1.5 Flash model
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domain(s) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input schema to receive data
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

    def __init__(self, **data):
        super().__init__(**data)
        self.Name = self.Name or None
        self.Age = self.Age or None
        self.Gender = self.Gender or None
        self.Phone = self.Phone or None
        self.Existing_Conditions = self.Existing_Conditions or None
        self.Allergies = self.Allergies or None
        self.Past_Surgeries = self.Past_Surgeries or None
        self.Ongoing_Diseases = self.Ongoing_Diseases or None
        self.Medications = self.Medications or None
        self.Lab_Results = self.Lab_Results or None
        self.Medical_Imaging_Files = self.Medical_Imaging_Files or None
        self.Consent = self.Consent or None 

# Output schema for the response
class MedicalReportResponse(BaseModel):
    medical_report: str
    transplant_needed: bool
    severity: str
    transplant_prompt: str

# POST endpoint for generating the detailed medical report
@app.post("/generate_detailed_report/", response_model=MedicalReportResponse)
async def generate_report(data: PatientData):
    try:
        print("Received data:", data)  # Debugging: Print the received data

        # Format the prompt with patient information
        prompt = f"""
        Generate a detailed medical analysis report for the following patient:

        **Name**: {data.Name}
        **Age**: {data.Age}
        **Gender**: {data.Gender}
        **Phone**: {data.Phone}
        **Existing Conditions**: {data.Existing_Conditions}
        **Allergies**: {data.Allergies}
        **Past Surgeries**: {data.Past_Surgeries}
        **Ongoing Diseases**: {data.Ongoing_Diseases}
        **Medications**: {data.Medications}
        **Lab Results**: {data.Lab_Results}
        **Medical Imaging Files**: {data.Medical_Imaging_Files}

        Analyze the above data and determine if the patient needs a transplant or replacement.
        If yes, determine the level of severity of the need: low, moderate, or high. If no transplant is required, state "null".

        If a transplant is required, generate a prompt for another model that will create a 3D model of the healthy organ or tissue that needs to be replaced. The 3D model should be functional and detailed. For example: 
        - "Generate a 3D diagram of a fully functional healthy heart".
        - "Generate a 3D diagram of a healthy kidney suitable for transplant".
        - "Generate a 3D diagram of a functional lung".

        The variables you will return should be:
        **transplant_needed**: True or False
        **severity**: The severity level (low, moderate, high) or null
        **transplant_prompt**: The 3D organ generation prompt, if applicable, else null
        """

        # Generate the report using the Gemini API
        response = model.generate_content(prompt)

        # Parse AI response to extract transplant information and severity
        if "transplant is needed" in response.text.lower():
            transplant_needed = True
            # Extract severity from response (this can be enhanced with more specific checks)
            if "high severity" in response.text.lower():
                severity = "high"
            elif "moderate severity" in response.text.lower():
                severity = "moderate"
            elif "low severity" in response.text.lower():
                severity = "low"
            else:
                severity = "null"

            # Generate the transplant prompt for 3D model generation
            transplant_prompt = "Generate a 3D diagram of a fully functional healthy organ suitable for transplant, such as a heart, kidney, or lung."
        else:
            transplant_needed = False
            severity = "null"
            transplant_prompt = "null"

        print("Generated report:", response.text)  # Debugging: Print the generated report
        print("Transplant needed:", transplant_needed)  # Debugging: Print the transplant needed status
        print("Severity:", severity)  # Debugging: Print the severity level
        print("Transplant prompt:", transplant_prompt)  # Debugging: Print the transplant prompt
        return {
            "medical_report": response.text,
            "transplant_needed": transplant_needed,
            "severity": severity,
            "transplant_prompt": transplant_prompt,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")

# Run the app locally
if __name__ == "__main__":
    nest_asyncio.apply()
    public_url = ngrok.connect(8000).public_url
    print(f"Public URL: {public_url}")
    uvicorn.run(app, host="0.0.0.0", port=8000)
