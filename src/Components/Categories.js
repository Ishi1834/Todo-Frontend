export default function Categories(props) {
  const categories = props.categoryDic.map((category, index) => (
    <h3
      key={index}
      className="text-center w-100 m-4 py-2 px-3  rounded-1"
      style={{ backgroundColor: category.color }}
    >
      {category.type}
    </h3>
  ));

  return (
    <div className="d-flex justify-content-between my-3">{categories}</div>
  );
}
