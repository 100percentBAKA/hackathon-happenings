from together import Together
import os


image_client = Together(api_key="use your key")

# prompt = """
#     Title of the Image:
# "Zomato New Year Campaign Poster"

# Campaign Details of the Image:
# Create a visually engaging ad campaign poster for Zomato's "New Year Feast." The campaign targets young professionals and families in Mumbai, India. The poster should promote Zomato's New Year celebration offer with the tagline: "Celebrate the New Year with Zomato - Delicious Discounts Await!"

# Target Audience Location:
# Focus on Mumbai, India, capturing its urban vibrancy, lively streets, and festive spirit. Include iconic visuals such as Marine Drive, fireworks, and local street food stalls.

# Trending Topic in that Location:
# The campaign should reflect the city's excitement for New Year celebrations and dining out trends. Use themes such as festive parties, street food exploration, and exclusive restaurant deals.

# Some More Context About the Trending Topic:
# Mumbai's trending topics during New Year include food festivals, discounts on dining, and rooftop parties. The poster should embody the joy and togetherness of dining during this festive season.

# Preferences for Text Placement:

# Headline ("Celebrate with Zomato"): Bold and centered at the top.
# Key Offer ("Flat 50% off on meals"): Highlighted in the center with vibrant text and contrasting background.
# Call-to-Action ("Download the app now!"): Positioned clearly at the bottom.
# Maintain a balanced design with festive colors and engaging visuals, avoiding clutter.
# """

prompt = "image of a rose in a beach"

response = image_client.images.generate(
    prompt=prompt, model="black-forest-labs/FLUX.1-schnell", steps=4, n=2
)

urls = []

for item in response.data:
    if hasattr(item, 'url'):
        urls.append(item.url)

# Print the URLs
for url in urls:
    print(url)
