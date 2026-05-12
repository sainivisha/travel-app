"use client";

type Props = {
  currentStep: 1 | 2;
};

export default function BookingSteps({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* STEP 1 */}
      <div className="flex items-center gap-2">
        <div
          className={`
            w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
            ${
              currentStep > 1
                ? "bg-green-500 text-white"
                : "bg-sky-500 text-white"
            }
          `}
        >
          {currentStep > 1 ? "✓" : "1"}
        </div>
        <span className="text-sm font-medium text-gray-700">Details</span>
      </div>

      {/* LINE */}
      <div className="w-16 h-[2px] bg-gray-300" />

      {/* STEP 2 */}
      <div className="flex items-center gap-2">
        <div
          className={`
            w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
            ${
              currentStep === 2
                ? "bg-sky-500 text-white"
                : "bg-gray-300 text-gray-600"
            }
          `}
        >
          2
        </div>
        <span className="text-sm font-medium text-gray-700">Payment</span>
      </div>
    </div>
  );
}
