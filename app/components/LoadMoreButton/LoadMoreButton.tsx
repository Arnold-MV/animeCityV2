"use client";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  label?: string;
}

export const LoadMoreButton = ({
  onClick,
  isLoading = false,
  label = "Ver más",
}: LoadMoreButtonProps) => {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-4 py-2 border transition-colors border-gray-500 bg-gray-600 hover:bg-gray-700 text-white rounded  disabled:opacity-50"
      >
        {isLoading ? "Cargando..." : label}
      </button>
    </div>
  );
};
