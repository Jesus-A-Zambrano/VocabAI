```
aws cloudformation create-stack \
  --stack-name my-backend-stack \
  --template-body file://cloudformation.yaml \
  --parameters ParameterKey=KeyName,ParameterValue=Vocamai \
               ParameterKey=RepositoryURL,ParameterValue=https://github.com/danny-mv/VocabAI.git \
  --capabilities CAPABILITY_NAMED_IAM \
  --region sa-east-1
```