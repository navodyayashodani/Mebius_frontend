function Tab(props) {
  const handleClick = (e) => {
    props.onTabClick(props._id);
  };

  return (
    <button 
      className={`border px-2 py-1 rounded-md ${
        props._id === props.selectedCategoryId 
          ? 'bg-[#edeef1]' 
          : 'border-[#edeef1]'
      }`}
      onClick={handleClick}
    >
      {props.name}
    </button>
  );
}

export default Tab;