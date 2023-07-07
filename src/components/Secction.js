import DataTable from "./DataTable.js";

const Secction = ({ id, title, info, route }) => {
  return (
    <section id={id} className="p-2 mb-56">
      <div className="flex flex-row items-center ml-20">
        <h1 className="mr-2 font-bold text-xl">{title}</h1>
        <div
          style={{
            width: "155px",
            height: "1px",
            border: "1px solid rgb(75 85 99)",
            marginTop: "2px",
          }}></div>
      </div>

      <DataTable route={route} headers={info} />
    </section>
  );
};

export default Secction;
