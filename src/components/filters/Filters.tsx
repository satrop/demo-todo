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
      <span>{activeCount} items left</span>
      <div>
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
      <button onClick={onClearCompleted}>Clear Completed</button>
    </div>
  );
};
