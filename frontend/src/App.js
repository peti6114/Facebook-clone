function App() {
  const get = async() => {
    const res = await fetch("http://localhost:8000");
    console.log(res);
  };
  get();
  return (
    <>
      <div className="text-3xl">Welcome Facebook</div>
    </>
  );
}

export default App;
