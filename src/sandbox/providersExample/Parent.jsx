import Child from "./Child";

function Parent() {
  const msg = "Hello from parent component";

  return (
    <div>
      <p>This is parent component</p>
      <Child message={msg} />
    </div>
  );
}

export default Parent;
