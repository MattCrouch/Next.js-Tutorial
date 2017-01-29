//Import React alongside Next and its functionality
import React from "react";
import css from "next/css";
//Import layout
import Layout from "../components/Layout";
//Import axios to load data
import axios from "axios";

//Style the image
const imageStyles = css({
    "width": "100%"
});

//Style the fact list
const factStyles = css({
    "listStyle": "none",
    "padding": 0,
    "& > li": {
        "margin": "1rem 0",
        "& .title": {
            "fontWeight": "bold"
        }
    }
});

//Export the location page component
export default class extends React.Component {
    // Fetch the data for this location
    static async getInitialProps({ query }) {
        if(typeof window !== "undefined" && window.sessionStorage && sessionStorage.getItem("locations")) {
            //Grab from local cache
            let locations = JSON.parse(sessionStorage.getItem("locations"));
            let location = locations.filter(location => location.id == query.id);

            return {
                location: location[0]
            }
        }

        //Fetch from server
        const locations = await axios.get("http://localhost:3000/static/locations.json");

        //Find this specific location's info
        let location = locations.data.filter(location => location.id == query.id);

        return {
            locations: locations.data,
            location: location[0]
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
            <Layout title={`Discovery | ${ this.props.location.name }`}>
                {/* Present the location */}
                <h2>{ this.props.location.name }</h2>

                <img src={ this.props.location.image } alt={ this.props.location.name } className={ imageStyles } />

                <p>{ this.props.location.description }</p>

                <h3>Facts</h3>
                
                {/* Loop through facts and display them */}
                <ul className={ factStyles }>
                    { this.props.location.facts.map((fact, index) => (
                        <li key={ index }>
                            <div className="title">{ fact.title }</div>
                            <div className="description">{ fact.description }</div>
                        </li>
                    ))}
                </ul>
            </Layout>
        );
    }
}