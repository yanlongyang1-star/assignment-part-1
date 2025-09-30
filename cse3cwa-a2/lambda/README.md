# AWS Lambda Function: HTML Room Generator

Serverless function that generates HTML pages from room data.

## Function Details

- **Runtime**: Node.js 20.x
- **Handler**: index.handler
- **Input**: JSON with `title` and `stages`
- **Output**: HTML string

## Input Format

```json
{
  "title": "Escape Room Challenge",
  "stages": [
    { "label": "Stage 1", "order": 0 },
    { "label": "Stage 2", "order": 1 },
    { "label": "Stage 3", "order": 2 }
  ]
}
```

## Local Testing

```bash
cd lambda
node test-local.mjs
```

This will generate `test-output.html` that you can open in a browser.

## Deployment to AWS Lambda

### 1. Create Deployment Package

```bash
cd lambda
zip -r function.zip .
```

### 2. Deploy via AWS CLI

```bash
aws lambda create-function \
  --function-name escape-room-html-generator \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip
```

### 3. Update Function

```bash
aws lambda update-function-code \
  --function-name escape-room-html-generator \
  --zip-file fileb://function.zip
```

### 4. Test Lambda

```bash
aws lambda invoke \
  --function-name escape-room-html-generator \
  --payload '{"body": "{\"title\":\"Test Room\",\"stages\":[{\"label\":\"Stage 1\",\"order\":0}]}"}' \
  response.json

cat response.json
```

## API Gateway Integration

### Create REST API

1. Create new REST API in API Gateway
2. Create resource `/generate-html`
3. Create POST method
4. Set integration type to Lambda Function
5. Enable CORS
6. Deploy API

### Test via API Gateway

```bash
curl -X POST https://YOUR_API_ID.execute-api.REGION.amazonaws.com/prod/generate-html \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Escape Room",
    "stages": [
      {"label": "Stage 1", "order": 0},
      {"label": "Stage 2", "order": 1}
    ]
  }'
```

## Environment Variables

None required for basic functionality.

Optional:
- `LOG_LEVEL`: Set logging verbosity (default: INFO)
- `CORS_ORIGIN`: Customize CORS origin (default: *)

## Error Handling

- **400**: Missing or invalid input
- **500**: Internal server error

## Response Headers

```
Content-Type: text/html
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=300
```

## Security Features

- HTML escaping to prevent XSS
- Input validation
- CORS support
- Error handling

## Cost Estimation

- **Requests**: First 1M requests/month free
- **Compute**: First 400,000 GB-seconds/month free
- **Storage**: Minimal (< 1 MB)

Typical cost for 100K requests: **< $0.20/month**

## Monitoring

View logs in CloudWatch:

```bash
aws logs tail /aws/lambda/escape-room-html-generator --follow
```

## IAM Role Required

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## Cleanup

```bash
aws lambda delete-function --function-name escape-room-html-generator
```
