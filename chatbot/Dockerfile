# Use Python image
FROM python:3.9

# Set working directory
WORKDIR /

# Copy files
COPY . .

# Install dependencies in a virtual environment
RUN python -m venv venv && \
    . venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run the Flask API
CMD ["bash", "-c", ". venv/bin/activate && python app.py"]
