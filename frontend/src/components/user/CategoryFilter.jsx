function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={activeCategory === 'all' ? 'active' : ''}
        onClick={() => onSelect('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={activeCategory === category ? 'active' : ''}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
