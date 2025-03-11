import { FilterType } from "@/types/todo";
import "./Filters.scss";

interface FiltersProps {
  className?: string;
  activeCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ className = "", activeCount, currentFilter, onFilterChange, onClearCompleted }) => {
  return (
    <div className={`filters ${className}`}>
      <span className="items">{activeCount} items left</span>
      <div className="filter-buttons">
        {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            className={currentFilter === filterType ? "active" : ""}
            onClick={() => onFilterChange(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
      <button
        className="clear"
        onClick={onClearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};
