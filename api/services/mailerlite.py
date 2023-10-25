import mailerlite as MailerLite
from dotenv import load_dotenv
import os

load_dotenv()

# MailerLite API Info: https://github.com/mailerlite/mailerlite-python

# Get MailerLite API
mailerlite_api_key = os.getenv('mailerlite_api_key')

client = MailerLite.Client({
  'api_key': mailerlite_api_key,
  'headers': {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": mailerlite_api_key
}
})

# Mailerlite Functions
def get_subscribers():
    response = client.subscribers.list()
    return response

def post_subscribers():
    print("first")
    response = client.subscribers.create()
    print(response)
    return response

