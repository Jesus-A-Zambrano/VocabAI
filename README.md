# VocabAI

A comprehensive vocabulary learning platform powered by AI.

## Project Structure

```
VocabAI/
├── apps/           # Application components
│   ├── backend/    # Node.js/Express backend API
│   ├── frontend/   # React/Vite frontend application
│   └── ml-api/     # Machine Learning API service
├── infra/         # Infrastructure as Code (CloudFormation, etc.)
├── data/          # Training data and datasets
├── notebooks/     # Jupyter notebooks for ML experimentation
└── training/      # ML model training scripts and pipelines
```

## Applications

### Backend (/apps/backend)
The main API server handling user management, vocabulary, and progress tracking.

### Frontend (/apps/frontend)
The web interface built with React and Vite.

### ML API (/apps/ml-api)
Machine learning service for vocabulary recommendations and analysis.

## Development

Each application has its own README with specific setup and development instructions.

## Infrastructure

Infrastructure configurations and deployment templates are located in the `infra/` directory.

## Machine Learning

- `data/`: Contains training datasets and data processing scripts
- `notebooks/`: Jupyter notebooks for experimentation and analysis
- `training/`: Production training pipelines and model development