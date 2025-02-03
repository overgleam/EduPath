import os
from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your React app

# Construct the model path relative to this file.
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model/classification_best.pkl')
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}. Please ensure it exists.")

# Load your pre-trained scikit-learn model.
model = joblib.load(model_path)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    if not data:
        print("No data received!")
        return jsonify({'message': 'No data received!'}), 400

    try:
        # Define the list of course options.
        courses = [
            "BSHM","BEED","BSCA","BSME",
            "BSED","BSCE","BSCS","BSBA",
            "BSIT","BSCOE","BSCRIM","BSA","BSMA"
        ]
        
        results = []

        # Loop over each course option
        for course in courses:
            # Make a copy of the incoming data and set the course field.
            new_input = data.copy()
            new_input['course'] = course
            
            # Create a DataFrame from the current input.
            df = pd.DataFrame([new_input])
            
            # Generate prediction using the loaded model.
            prediction = model.predict(df)
            
            # Try to get the probability using predict_proba
            try:
                # For binary classifiers we assume index 1 corresponds to "completion"
                probs = model.predict_proba(df)
                if probs.shape[1] == 2:
                    probability = probs[0][1]
                else:
                    # For multi-class: use the probability of the predicted class.
                    probability = probs[0][prediction[0]]
            except Exception as err:
                print("Predict proba not supported:", err)
                probability = None

            # Build a minimal result record with only the necessary fields.
            result_record = {
                'course': course,   
                'prediction': prediction[0],
                'probability': probability
            }
            results.append(result_record)
        
        # Return all the prediction records back to the frontend.
        return jsonify({
            'message': 'Prediction generated successfully!',
            'data': results
        })
    except Exception as e:
        print("Error processing data:", str(e))
        return jsonify({
            'message': 'Error processing data',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)