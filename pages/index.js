//Import React alongside Next and its functionality
import React from "react";
import css from "next/css";
//Import layout component
import Layout from "../components/Layout";
//Import LocationPreview component
import LocationPreview from "../components/LocationPreview";

//Import axios to load data
import axios from "axios";

//Style the page
const styles = css({
    "overflow": "hidden",
    "& a:hover div, & a:focus div": {
        "borderBottomWidth": "6px"
    }
});

//Export the index page component
export default class extends React.Component {
    //Fetch location data
    static async getInitialProps() {
        if(typeof window !== "undefined" && window.sessionStorage && sessionStorage.getItem("locations")) {
            //Grab from local cache
            return {
                locations: JSON.parse(sessionStorage.getItem("locations"))
            }
        }

        //Fetch from server
        const locations = await axios.get("http://localhost:3000/static/locations.json");

        return {
            locations: locations.data
        }
    }

    componentDidMount() {
        //Save to session storage if supported
        if(this.props.locations && window.sessionStorage && !sessionStorage.getItem("locations")) {
            sessionStorage.setItem("locations", JSON.stringify(this.props.locations));
        }
    }

    render() {
        return(
            <Layout title="Discovery">
                <h2>Locations</h2>
                <div className={ styles }>
                {/* Display a location block for each location in the data */}
                    { this.props.locations.map(location => (
                        <LocationPreview key={ location.id } location={ location } />
                    )) }
                </div>
            </Layout>
        );
    }
}
