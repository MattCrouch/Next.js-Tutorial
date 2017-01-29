//Import React alongside Next and its functionality
import React from "react";
import Link from "next/link";
//Import the application layout
import Layout from "../components/Layout";

//Export the error page component
export default class extends React.Component {
    //Grab the HTTP status of the error
    static async getInitialProps({ res, xhr }) {
        const statusCode = res ? res.statusCode : (xhr ? xhr.status : null);
        //Set it as a prop to pick up in the page
        return { statusCode };
    }

    render() {
        return(
            <Layout title="Discovery | Error">
                <h2>There was an error</h2>

                <p>{ this.props.statusCode ? `Error ${ this.props.statusCode } occurred` : "" }</p>

                <Link href="/">Back to Homepage</Link>
            </Layout>
        );
    }
}
