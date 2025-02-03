import React, { useState } from 'react';
import { fields } from '@/fields.js';
import { submitFormData } from '@/services/api.js';
import { RainbowButton } from "@/components/ui/rainbow-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function EduPathDataForm() {
  
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [state, setState] = useState(initialFormState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation: if any field is not filled, show a toast error.
    for (const field of fields) {
      if (!state[field.name]) {
        toast(`Please select an option for ${field.label}. 🦄`);
        return; // Stop submission if a field is missing.
      }
    }

    try {
      const data = await submitFormData(state);
      // Navigate to the results page and pass the prediction data via state.
      navigate('/results', { state: { predictionData: data.data }});
      setState(initialFormState);
      toast.success("Submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error submitting form.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-6 rounded shadow-md transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fields.map(field => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              <select
                name={field.name}
                value={state[field.name]}
                onChange={handleChange}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white transition-colors duration-300"
              >
                <option value="">{`Select ${field.label}`}</option>
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        <RainbowButton type="submit" className="mt-6 w-1/2 p-3 rounded-lg transition-colors duration-300">
          <TextAnimate>
            Generate Predictions
          </TextAnimate>
        </RainbowButton>
      </form>
    </>
  );
}

export default EduPathDataForm;