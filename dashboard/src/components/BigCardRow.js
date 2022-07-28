import UsersInDbCard from "./UsersInDBCard";
import LastMovieInDb from "./LastMovieCard";

function BigCardRow() {
  return (
    <div className="row">
      {/* <!-- Last Movie in DB --> */}
      <LastMovieInDb />
      <UsersInDbCard />
    </div>
  );
}

export default BigCardRow;
