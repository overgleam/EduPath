import { useLocation, useNavigate } from 'react-router-dom';
import { RainbowButton } from '@/components/ui/rainbow-button';

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const predictionData = location.state?.predictionData;
  console.log("predictionData", predictionData);

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
  
  // Sort prediction data based on the probability of completion (higher probability first)
  const sortedPredictionData = [...predictionData].sort((a, b) => {
    // Replace null probabilities with 0 if necessary
    const probaA = a.probability ?? 0;
    const probaB = b.probability ?? 0;
    return probaB - probaA;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800 p-6">
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Prediction Result
        </h2>
        <table className="min-w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                Course
              </th>
              <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                Prediction
              </th>
              <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                Model Confidence
              </th>
              <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left dark:text-white">
                Expected Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPredictionData.map((item, idx) => {
              const { course, prediction, probability, expectedGrade } = item;
              return (
                <tr key={idx}>
                  <td className="border px-4 py-2 dark:text-white">{course}</td>
                  <td className="border px-4 py-2 dark:text-white">{prediction}</td>
                  <td className="border px-4 py-2 dark:text-white">
                    {probability !== null
                      ? (probability * 100).toFixed(2) + '%'
                      : 'N/A'}
                  </td>
                  <td className="border px-4 py-2 dark:text-white">{expectedGrade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <RainbowButton onClick={() => navigate(-1)} className="mt-6">
        Back
      </RainbowButton>
    </div>
  );
}

export default PredictionResult; 