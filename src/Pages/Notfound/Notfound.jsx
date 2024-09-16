import notfound from "../../assets/images/error.svg";
export default function Notfound() {
  return (
    <>
      <div className="">
        <img className="mx-auto py-10 " src={notfound} alt="page not found " />
      </div>
    </>
  );
}
