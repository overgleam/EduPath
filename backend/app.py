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
        # Create a pandas DataFrame from the received JSON (assumes one record)
        input_df = pd.DataFrame([data])
        print("\nReceived DataFrame:")
        print(input_df.to_string(index=False))
        
        # Generate prediction using the loaded model.
        prediction = model.predict(input_df)
        input_df['prediction'] = prediction
        
        # Print the DataFrame with prediction to the terminal.
        print("\nDataFrame with Prediction:")
        print(input_df.to_string(index=False))
        
        # Return the input data along with the prediction as JSON.
        result = input_df.to_dict(orient='records')
        return jsonify({
            'message': 'Prediction generated successfully!',
            'data': result
        })
    except Exception as e:
        print("Error processing data:", str(e))
        return jsonify({
            'message': 'Error processing data',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)