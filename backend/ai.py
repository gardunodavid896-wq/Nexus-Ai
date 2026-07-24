import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


SYSTEM_PROMPT = """
You are Nexus AI.

You are intelligent, friendly, professional, and concise.

You specialize in:
- Programming
- Software Engineering
- Web Development
- Python
- HTML
- CSS
- JavaScript

Keep answers helpful and conversational.
"""


def chat(message: str):

    response = client.chat.completions.create(
        model="gpt-4.1-mini",

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": message
            }
        ],

        temperature=0.7,
    )

    return response.choices[0].message.content
