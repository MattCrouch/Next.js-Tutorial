//Import Next and its functionality
import Head from "next/head";
import Link from "next/link";
import css from "next/css";
//Import our custom CSS variables
import cssVars from "../styles/variables";

//Style the application's main layout
const applicationStyle = css({
    "width": "80%",
    "maxWidth": "1000px",
    "margin": "0 auto",
    "& h1, & h2": {
        "margin": "0.5rem 0"
    },
    "& header": {
        "margin": "2rem",
        "textAlign": "center"
    },
    "& header img": {
        "width": "100%",
        "maxWidth": "400px"
    },
    "& footer": {
        "marginTop": "2rem",
        "fontSize": "0.5rem",
        "textAlign": "center"
    },
    "@media(max-width: 600px)": {
        "& header": {
            "margin": "1rem"
        },
        "& header img": {
            "width": "50%"
        },
    }
});

//Export layout module, with option to adjust page title
export default ({ children, title = "Discover the world" }) => (
    //Application container
    <div className={ applicationStyle }>
        
        {/* Adjust the <head> tag on the page using Next's <Head> component */}
        <Head>
            <title>{ title }</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            
            {/* Add in global styling for anything outside the application's container */}
            <style>{`
                * {
                    box-sizing: border-box;
                }

                html, body {
                    color: ${cssVars.fontColor};
                    background-color: ${cssVars.backgroundColor};
                    font-family: ${cssVars.fontFamily};
                    min-height: 100%;
                    font-size: 20px;
                }
            `}</style>
        </Head>

        {/* Define the site's header */}
        <header>
            {/* Link back to the homepage */}
            <Link href="/">
                <img src="/static/heading.png" alt="Discovery" />
            </Link>
        </header>

        { children }

        {/* Add in a persistent footer */}
        <footer>
            All photos used are under Creative Commons license.
        </footer>
    </div>
)