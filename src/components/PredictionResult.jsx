import { useLocation, useNavigate } from 'react-router-dom';
import { RainbowButton } from '@/components/ui/rainbow-button';

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const predictionData = location.state?.predictionData;

  // If no prediction data is available, prompt the user to submit the form.
  if (!predictionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          No prediction data found. Please submit the form.
        </p>
        <RainbowButton onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </RainbowButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 p-6">
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Prediction Result
        </h2>
        {predictionData.map((item, index) => {
          // Destructure the prediction field and the rest of the data.
          const { prediction, ...otherData } = item;
          return (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <p className="text-lg dark:text-white">
                  <span className="font-bold">Prediction: </span>
                  {prediction}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                        Field
                      </th>
                      <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(otherData).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border px-4 py-2 dark:text-white">{key}</td>
                        <td className="border px-4 py-2 dark:text-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
      <RainbowButton onClick={() => navigate(-1)} className="mt-6">
        Back
      </RainbowButton>
    </div>
  );
}

export default PredictionResult; 