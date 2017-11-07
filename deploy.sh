#!/bin/bash
rm ee-tools-skill.zip
cd lambda
zip -r ee-tools-skill.zip .
cd ..
mv lambda/ee-tools-skill.zip ./ee-tools-skill.zip

aws lambda update-function-code --function-name ee-tools-skill --zip-file fileb://ee-tools-skill.zip
