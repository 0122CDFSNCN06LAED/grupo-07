import { Route, Switch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import Footer from "./Footer";
import UsersInDbCard from "./UsersInDBCard";
import LastMovieInDb from "./LastMovieCard";
import ProductsList from "./ProductsList";

function MainContent() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={DashboardContent} />
            <Route path="/users" component={UsersInDbCard} />
            <Route path="/last-movie" component={LastMovieInDb} />
            <Route path="/products" component={ProductsList} />
          </Switch>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainContent;
