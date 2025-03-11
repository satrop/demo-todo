import { FilterType } from "@/types/todo";
import "./Filters.scss";

interface FiltersProps {
  activeCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export const Filters = ({ activeCount, currentFilter, onFilterChange, onClearCompleted }: FiltersProps) => {
  return (
    <div className="filters">
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
