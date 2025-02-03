import React, { useState } from 'react';
import { fields } from '@/fields.js';
import { submitFormData } from '@/services/api.js';
import { RainbowButton } from "@/components/ui/rainbow-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

function EduPathDataForm() {
  
  // initialize only using the available field keys
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [state, setState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation for each field in our current fields list.
    for (const field of fields) {
      if (!state[field.name]) {
        toast.error(`Please select an option for ${field.label}.`);
        return; // If any field is missing, halt submission.
      }
    }
    console.log("state", state);
    // Display loading overlay
    setLoading(true);
    try {
      const data = await submitFormData(state);

      // Navigate to the results page and pass the prediction data via state.
      navigate('/results', { state: { predictionData: data.data }});
      setState(initialFormState);
      toast.success("Submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error submitting form.");
    } finally {
      // Hide loading overlay
      setLoading(false);
    }
  };

  // Group fields based on their group key
  const groupedFields = [
    {
      title: "Demographics",
      fields: fields.filter(field => field.group === "demographics"),
    },
    {
      title: "Educational Background",
      fields: fields.filter(field => field.group === "educationalBackground"),
    },
    {
      title: "Academic Records",
      fields: fields.filter(field => field.group === "academicRecords"),
    },
  ];

  // If loading, display a fullscreen overlay with the spinner.
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800 z-50">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
        <p className="mt-4 text-gray-700 dark:text-gray-300">Processing...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-6 rounded shadow-md transition-colors duration-300">
      <AnimatedGridPattern  
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn("[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]", "opacity-30")}
      />
      
      {groupedFields.map(group => (
        <div key={group.title} className="mb-6 w-full">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {group.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {group.fields.map(field => (
              <div key={field.name} className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {field.description}
                </p>
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
        </div>
      ))}

      <RainbowButton type="submit" className="mt-6 w-1/4 p-3 rounded-xl transition-colors duration-300">
        <TextAnimate animation="scaleUp" by="character">
          Generate Predictions
        </TextAnimate>
      </RainbowButton>
    </form>
  );
}

export default EduPathDataForm;